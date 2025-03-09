document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const introSection = document.getElementById('intro');
    const questionnaireSection = document.getElementById('questionnaire');
    const resultsSection = document.getElementById('results');
    const progressContainer = document.getElementById('progress-container');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const questionCounter = document.getElementById('question-counter');
    const currentCategoryText = document.getElementById('current-category');
    const categoryNumber = document.getElementById('category-number');
    const totalCategories = document.getElementById('total-categories');
    const questionContainer = document.getElementById('question-container');
    const startBtn = document.getElementById('start-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const saveResultsBtn = document.getElementById('save-results-btn');
    const scienceDetails = document.getElementById('science-details');
    const toggleScienceBtn = document.getElementById('toggle-science');

    // Variáveis de estado
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let isScienceDetailsVisible = false;
    
    // Verificar se existem respostas salvas no localStorage
    const savedAnswers = localStorage.getItem('autoavaliacao_respostas');
    if (savedAnswers) {
        userAnswers = JSON.parse(savedAnswers);
    }
    
    // Inicializar valores totais
    totalCategories.textContent = categories.length;

    // Event Listeners
    startBtn.addEventListener('click', startQuestionnaire);
    prevBtn.addEventListener('click', showPreviousQuestion);
    nextBtn.addEventListener('click', handleNextButton);
    restartBtn.addEventListener('click', restartQuestionnaire);
    saveResultsBtn.addEventListener('click', saveResultsAsPDF);
    toggleScienceBtn.addEventListener('click', toggleScienceDetails);

    // Função para iniciar o questionário
    function startQuestionnaire() {
        introSection.classList.add('hidden');
        questionnaireSection.classList.remove('hidden');
        progressContainer.classList.remove('hidden');
        
        // Se existirem respostas salvas, pergunte se o usuário quer continuar de onde parou
        if (userAnswers.length > 0) {
            if (confirm('Você tem respostas salvas. Deseja continuar de onde parou?')) {
                currentQuestionIndex = userAnswers.length;
                if (currentQuestionIndex >= questions.length) {
                    // Se todas as perguntas já foram respondidas, mostrar os resultados
                    showResults();
                    return;
                }
            } else {
                // Se o usuário não quiser continuar, limpar as respostas salvas
                userAnswers = [];
                localStorage.removeItem('autoavaliacao_respostas');
            }
        }
        
        renderQuestion();
        updateProgress();
    }

    // Função para exibir a pergunta atual
    function renderQuestion() {
        const question = questions[currentQuestionIndex];
        const currentCategory = categories.find(cat => cat.id === question.category);
        
        // Atualizar indicador de categoria
        currentCategoryText.textContent = currentCategory.name;
        const categoryIndex = categories.findIndex(cat => cat.id === currentCategory.id) + 1;
        categoryNumber.textContent = categoryIndex;
        
        // Criar o elemento da pergunta
        questionContainer.innerHTML = '';
        
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.innerHTML = `
            <h3 class="question-text">${question.id}. ${question.text}</h3>
            <div class="options">
                ${createOptions()}
            </div>
        `;
        
        questionContainer.appendChild(questionElement);
        
        // Adicionar event listeners aos novos elementos de opção
        document.querySelectorAll('.option').forEach((option, index) => {
            option.addEventListener('click', () => {
                selectOption(index);
            });
        });
        
        // Marcar opção selecionada se já existir
        if (userAnswers[currentQuestionIndex] !== undefined) {
            const selectedOption = document.querySelector(`.option[data-value="${userAnswers[currentQuestionIndex] + 1}"]`);
            if (selectedOption) {
                selectedOption.classList.add('selected');
            }
        }
    }
    
    // Criar as opções de resposta
    function createOptions() {
        const options = [
            { value: 1, text: 'Discordo totalmente / Nunca' },
            { value: 2, text: 'Discordo em parte / Raramente' },
            { value: 3, text: 'Neutro (nem concordo nem discordo) / Às vezes' },
            { value: 4, text: 'Concordo em parte / Frequentemente' },
            { value: 5, text: 'Concordo totalmente / Sempre' }
        ];
        
        return options.map((option, index) => `
            <div class="option" data-value="${option.value}">
                <input type="radio" id="option-${index}" name="question-${currentQuestionIndex}" value="${option.value}" ${userAnswers[currentQuestionIndex] === index ? 'checked' : ''}>
                <label for="option-${index}">
                    <strong>${option.value}:</strong> ${option.text}
                </label>
            </div>
        `).join('');
    }
    
    // Selecionar uma opção
    function selectOption(index) {
        // Remover seleção de todas as opções
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Adicionar classe 'selected' à opção escolhida
        document.querySelector(`.option[data-value="${index + 1}"]`).classList.add('selected');
        
        // Atualizar resposta do usuário
        userAnswers[currentQuestionIndex] = index;
        
        // Salvar resposta no localStorage
        saveAnswers();
    }

    // Função para mostrar a pergunta anterior
    function showPreviousQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            renderQuestion();
            updateProgress();
            
            // Atualizar estado dos botões
            if (currentQuestionIndex === 0) {
                prevBtn.disabled = true;
            }
            
            // Garantir que o botão "Próxima" mostre o texto correto
            updateNextButtonText();
        }
    }

    // Função para lidar com o botão "Próxima" / "Ver Resultados"
    function handleNextButton() {
        // Verificar se uma opção foi selecionada
        if (userAnswers[currentQuestionIndex] === undefined) {
            alert('Por favor, selecione uma opção antes de continuar.');
            return;
        }
        
        if (currentQuestionIndex < questions.length - 1) {
            // Avançar para a próxima pergunta
            currentQuestionIndex++;
            renderQuestion();
            updateProgress();
            
            // Habilitar botão "Anterior" se não estiver na primeira pergunta
            if (currentQuestionIndex > 0) {
                prevBtn.disabled = false;
            }
            
            // Atualizar texto do botão "Próxima" / "Ver Resultados"
            updateNextButtonText();
        } else {
            // Mostrar resultados
            showResults();
        }
    }

    // Atualizar o texto do botão "Próxima" / "Ver Resultados"
    function updateNextButtonText() {
        if (currentQuestionIndex === questions.length - 1) {
            nextBtn.textContent = 'Ver Resultados';
        } else {
            nextBtn.textContent = 'Próxima';
        }
    }

    // Função para atualizar a barra de progresso
    function updateProgress() {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}%`;
        questionCounter.textContent = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
    }

    // Função para mostrar os resultados
    function showResults() {
        questionnaireSection.classList.add('hidden');
        progressContainer.classList.add('hidden');
        resultsSection.classList.remove('hidden');
        
        // Calcular pontuações por categoria
        const categoryScores = calculateCategoryScores();
        
        // Calcular pontuação total
        const totalScore = calculateTotalScore(categoryScores);
        document.getElementById('total-score').textContent = totalScore;
        
        // Atualizar o medidor de pontuação geral
        const scoreFill = document.getElementById('score-fill');
        const scorePercentage = (totalScore / 250) * 100;
        scoreFill.style.width = `${scorePercentage}%`;
        
        // Determinar a interpretação geral
        const overallInterpretation = getOverallInterpretation(totalScore);
        document.getElementById('overall-interpretation').innerHTML = `<p>${overallInterpretation}</p>`;
        
        // Criar gráfico de resultados
        createResultsChart(categoryScores);
        
        // Mostrar resultados detalhados por categoria
        displayCategoryResults(categoryScores);
        
        // Mostrar recomendações personalizadas
        displayRecommendations(categoryScores);
    }
    
    // Calcular pontuações por categoria
    function calculateCategoryScores() {
        const categoryScores = {};
        
        // Inicializar pontuações por categoria
        categories.forEach(category => {
            categoryScores[category.id] = {
                score: 0,
                count: 0,
                average: 0,
                category: category
            };
        });
        
        // Somar pontuações
        userAnswers.forEach((answer, index) => {
            const question = questions[index];
            const categoryId = question.category;
            
            categoryScores[categoryId].score += answer + 1; // +1 porque os índices começam em 0
            categoryScores[categoryId].count++;
        });
        
        // Calcular médias
        Object.keys(categoryScores).forEach(categoryId => {
            const category = categoryScores[categoryId];
            if (category.count > 0) {
                category.average = category.score / category.count;
            }
        });
        
        return categoryScores;
    }
    
    // Calcular pontuação total
    function calculateTotalScore(categoryScores) {
        let totalScore = 0;
        let totalQuestions = 0;
        
        Object.values(categoryScores).forEach(category => {
            totalScore += category.score;
            totalQuestions += category.count;
        });
        
        return totalScore;
    }
    
    // Obter interpretação geral
    function getOverallInterpretation(totalScore) {
        // Pontuação máxima possível: 250 (50 perguntas * 5 pontos)
        if (totalScore <= 75) {
            return "Parabéns! Você demonstra poucos comportamentos de autossabotagem. Continue cultivando hábitos e mentalidades positivas.";
        } else if (totalScore <= 125) {
            return "Você exibe níveis moderados de autossabotagem. Há espaço para melhorias em algumas áreas específicas, mas você já tem boas práticas em outras.";
        } else if (totalScore <= 175) {
            return "Você demonstra vários padrões de autossabotagem que estão limitando significativamente seu potencial. Concentre-se nas áreas mais problemáticas primeiro.";
        } else {
            return "Seus níveis de autossabotagem são muito altos e estão seriamente comprometendo suas chances de sucesso. Considere buscar ajuda profissional para quebrar esses padrões.";
        }
    }
    
    // Criar gráfico de resultados
    function createResultsChart(categoryScores) {
        const ctx = document.getElementById('results-chart').getContext('2d');
        
        const chartData = {
            labels: categories.map(cat => cat.name),
            datasets: [{
                label: 'Nível de Autossabotagem',
                data: categories.map(cat => categoryScores[cat.id].average.toFixed(1)),
                backgroundColor: categories.map(cat => cat.color + '80'), // Add transparency
                borderColor: categories.map(cat => cat.color),
                borderWidth: 2
            }]
        };
        
        new Chart(ctx, {
            type: 'radar',
            data: chartData,
            options: {
                scales: {
                    r: {
                        beginAtZero: true,
                        min: 0,
                        max: 5,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const categoryId = categories[context.dataIndex].id;
                                const score = categoryScores[categoryId].average.toFixed(1);
                                let severity;
                                
                                const category = categories[context.dataIndex];
                                if (score <= category.lowThreshold / category.count) {
                                    severity = 'Baixa';
                                } else if (score <= category.highThreshold / category.count) {
                                    severity = 'Média';
                                } else {
                                    severity = 'Alta';
                                }
                                
                                return `${context.dataset.label}: ${score} (${severity})`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Mostrar resultados detalhados por categoria
    function displayCategoryResults(categoryScores) {
        const categoryResultsContainer = document.getElementById('categories-results');
        categoryResultsContainer.innerHTML = '';
        
        // Ordenar categorias da maior para a menor pontuação
        const sortedCategories = Object.values(categoryScores)
            .sort((a, b) => b.average - a.average);
        
        sortedCategories.forEach(categoryData => {
            const category = categoryData.category;
            const average = categoryData.average;
            
            // Determinar o nível de autossabotagem
            let level, levelClass;
            if (average * categoryData.count <= category.lowThreshold) {
                level = 'Baixa';
                levelClass = 'score-low';
            } else if (average * categoryData.count <= category.highThreshold) {
                level = 'Média';
                levelClass = 'score-medium';
            } else {
                level = 'Alta';
                levelClass = 'score-high';
            }
            
            // Determinar a interpretação
            let interpretation;
            if (level === 'Baixa') {
                interpretation = category.interpretation.low;
            } else if (level === 'Média') {
                interpretation = category.interpretation.medium;
            } else {
                interpretation = category.interpretation.high;
            }
            
            // Calcular porcentagem da barra
            const percentage = (average / 5) * 100;
            
            // Criar elemento de resultado
            const categoryResult = document.createElement('div');
            categoryResult.className = 'category-result';
            categoryResult.innerHTML = `
                <div class="category-header">
                    <h4 class="category-title">${category.name}</h4>
                    <span class="category-score ${levelClass}">Autossabotagem ${level} (${average.toFixed(1)})</span>
                </div>
                <p class="category-description">${category.description}</p>
                <div class="category-bar">
                    <div class="category-fill" style="width: ${percentage}%; background-color: ${category.color};"></div>
                </div>
                <p class="category-interpretation">${interpretation}</p>
            `;
            
            categoryResultsContainer.appendChild(categoryResult);
        });
    }
    
    // Mostrar recomendações personalizadas
    function displayRecommendations(categoryScores) {
        const recommendationsContainer = document.getElementById('recommendations-list');
        recommendationsContainer.innerHTML = '';
        
        // Obter as 3 categorias com maior autossabotagem
        const topCategories = Object.values(categoryScores)
            .sort((a, b) => b.average - a.average)
            .slice(0, 3);
        
        topCategories.forEach(categoryData => {
            const category = categoryData.category;
            const categoryRecommendations = recommendations[category.id];
            
            // Selecionar aleatoriamente 4 recomendações
            const selectedRecommendations = getRandomItems(categoryRecommendations, 4);
            
            // Criar elemento de recomendação
            const recommendationItem = document.createElement('div');
            recommendationItem.className = 'recommendation-item';
            
            // Criar lista de recomendações
            const recommendationList = document.createElement('ul');
            recommendationList.className = 'recommendation-list';
            
            selectedRecommendations.forEach(recommendation => {
                const listItem = document.createElement('li');
                listItem.textContent = recommendation;
                recommendationList.appendChild(listItem);
            });
            
            recommendationItem.innerHTML = `
                <h4 class="recommendation-category">${category.name}</h4>
            `;
            recommendationItem.appendChild(recommendationList);
            
            recommendationsContainer.appendChild(recommendationItem);
        });
    }
    
    // Função auxiliar para selecionar N itens aleatórios de um array
    function getRandomItems(array, n) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
    }
    
    // Função para reiniciar o questionário
    function restartQuestionnaire() {
        if (confirm('Tem certeza que deseja reiniciar o questionário? Todas as suas respostas serão perdidas.')) {
            userAnswers = [];
            currentQuestionIndex = 0;
            localStorage.removeItem('autoavaliacao_respostas');
            
            resultsSection.classList.add('hidden');
            introSection.classList.remove('hidden');
        }
    }
    
    // Função para salvar as respostas no localStorage
    function saveAnswers() {
        localStorage.setItem('autoavaliacao_respostas', JSON.stringify(userAnswers));
    }
    
    // Função para salvar os resultados como PDF
    function saveResultsAsPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const resultsElement = document.getElementById('results');
        
        // Configurar título
        doc.setFontSize(20);
        doc.text('Resultados da Autoavaliação de Autossabotagem', 10, 15);
        
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        
        // Adicionar data
        const today = new Date();
        const dateStr = today.toLocaleDateString();
        doc.text(`Data: ${dateStr}`, 10, 25);
        
        // Adicionar pontuação geral
        const totalScore = document.getElementById('total-score').textContent;
        doc.text(`Pontuação Total: ${totalScore} de 250`, 10, 35);
        
        // Adicionar interpretação geral
        const overallInterpretation = document.getElementById('overall-interpretation').textContent;
        const wrappedInterpretation = doc.splitTextToSize(overallInterpretation, 180);
        doc.text(wrappedInterpretation, 10, 45);
        
        let yPosition = 45 + (wrappedInterpretation.length * 7);
        
        // Adicionar resultados por categoria
        doc.setFontSize(16);
        doc.text('Resultados por Categoria', 10, yPosition);
        yPosition += 10;
        
        const categoryResults = document.querySelectorAll('.category-result');
        categoryResults.forEach(categoryResult => {
            // Se houver espaço insuficiente na página, adicionar nova página
            if (yPosition > 280) {
                doc.addPage();
                yPosition = 20;
            }
            
            const categoryTitle = categoryResult.querySelector('.category-title').textContent;
            const categoryScore = categoryResult.querySelector('.category-score').textContent;
            const categoryInterpretation = categoryResult.querySelector('.category-interpretation').textContent;
            
            doc.setFontSize(14);
            doc.text(`${categoryTitle} - ${categoryScore}`, 10, yPosition);
            yPosition += 7;
            
            doc.setFontSize(12);
            const wrappedCategoryInterpretation = doc.splitTextToSize(categoryInterpretation, 180);
            doc.text(wrappedCategoryInterpretation, 10, yPosition);
            
            yPosition += (wrappedCategoryInterpretation.length * 7) + 5;
        });
        
        // Adicionar nova página para recomendações
        doc.addPage();
        yPosition = 20;
        
        // Adicionar recomendações
        doc.setFontSize(16);
        doc.text('Recomendações Personalizadas', 10, yPosition);
        yPosition += 10;
        
        const recommendationItems = document.querySelectorAll('.recommendation-item');
        recommendationItems.forEach(recommendationItem => {
            const categoryTitle = recommendationItem.querySelector('.recommendation-category').textContent;
            const recommendations = recommendationItem.querySelectorAll('li');
            
            // Se houver espaço insuficiente na página, adicionar nova página
            if (yPosition > 280) {
                doc.addPage();
                yPosition = 20;
            }
            
            doc.setFontSize(14);
            doc.text(categoryTitle, 10, yPosition);
            yPosition += 7;
            
            doc.setFontSize(12);
            
            recommendations.forEach(recommendation => {
                const recommendationText = recommendation.textContent;
                const wrappedRecommendation = doc.splitTextToSize(`• ${recommendationText}`, 180);
                
                // Se houver espaço insuficiente na página, adicionar nova página
                if (yPosition + (wrappedRecommendation.length * 7) > 290) {
                    doc.addPage();
                    yPosition = 20;
                }
                
                doc.text(wrappedRecommendation, 10, yPosition);
                yPosition += (wrappedRecommendation.length * 7) + 3;
            });
            
            yPosition += 5;
        });
        
        // Adicionar nota final
        if (yPosition > 260) {
            doc.addPage();
            yPosition = 20;
        }
        
        doc.setFontSize(12);
        doc.text('Este relatório foi gerado com base em suas respostas ao Questionário de Autoavaliação de Autossabotagem.', 10, yPosition);
        yPosition += 7;
        doc.text('Use-o como ponto de partida para identificar e modificar comportamentos limitantes.', 10, yPosition);
        
        // Salvar o PDF
        doc.save('Autoavaliacao_Autossabotagem.pdf');
    }
    
    // Função para mostrar/esconder detalhes da base científica
    function toggleScienceDetails() {
        if (isScienceDetailsVisible) {
            scienceDetails.classList.add('hidden');
            toggleScienceBtn.innerHTML = 'Ver base científica detalhada <i class="fas fa-chevron-down"></i>';
        } else {
            scienceDetails.classList.remove('hidden');
            toggleScienceBtn.innerHTML = 'Ocultar base científica <i class="fas fa-chevron-up"></i>';
        }
        
        isScienceDetailsVisible = !isScienceDetailsVisible;
    }
});