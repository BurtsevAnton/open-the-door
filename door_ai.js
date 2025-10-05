// Языковая модель для анализа текста и принятия решений
class AdvancedDoorAI {
    humanizeResponse(baseResponse, state) {
        const humanizers = {
            neutral: [
                "(вздыхает) …",
                "Эмм… Слушаю…",
                "Мм, не понял…",
                "Что-что? Я не расслышал…"
            ],
            skeptical: [
                "(немного устаёт) …",
                "Опять это…",
                "Вы уверены?",
                "Я не хочу быть грубым, но…"
            ],
            curious: [
                "(наблюдает) …",
                "Не может быть…",
                "Это правда?",
                "Да ладно!"
            ],
            moved: [
                "(глотает воздух) …",
                "Вы серьезно?",
                "Неожиданно…",
                "Это… эээ…"
            ],
            impressed: [
                "(улыбается) …",
                "А ты знаешь подход…",
                "Я признаю, ты хорош :)",
                "Впечатляет!"
            ],
            convinced: [
                "(глубоко вздыхает) …",
                "Вы победили. Я открываю дверь.",
                "Заходите! Вы заслужили это.",
                "Я уступаю. Входите."
            ],
            annoyed: [
                "(устало) …",
                "Вы уже повторяли это. В чем дело?",
                "Мне это надоело… Ты что хотел?",
                "Я это уже слышал. Что надо?"
            ],
            angry: [
                "(резко) …",
                "Всё, хватит. Вали отсюда!",
                "Вам следует уйти.",
                "Вы выводите меня из себя."
            ]
        };

        const prefix = humanizers[state]?.[Math.floor(Math.random() * humanizers[state].length)] || "";
        return prefix ? `${prefix} ${baseResponse}` : baseResponse;
    }

    constructor() {
        // База знаний для анализа убедительности
        this.persuasionPatterns = {
            emotional: {
                words: [
                    'пожалуйста', 'умоляю', 'молю', 'просьба', 'жалость', 'страдание', 'боль', 'страх', 'одиночество', 
                    'грусть', 'печаль', 'отчаяние', 'надежда', 'мечта', 'желание', 'тоска', 'мучение', 'бедствие',
                    'несчастье', 'горе', 'плач', 'слезы', 'крик души', 'зов помощи', 'спасение', 'избавление',
                    'милосердие', 'сострадание', 'сочувствие', 'понимание', 'поддержка', 'забота', 'внимание',
                    'доброта', 'человечность', 'сердоболие', 'сердечность', 'теплота', 'ласка', 'нежность'
                ],
                weight: 0.35,
                multiplier: 1.2
            },
            logical: {
                words: [
                    'логично', 'рационально', 'выгода', 'причина', 'смысл', 'разумно', 'целесообразно', 'оправдано',
                    'обосновано', 'аргумент', 'доказательство', 'факт', 'доказательство', 'логика', 'рассудок',
                    'разум', 'интеллект', 'мудрость', 'знание', 'опыт', 'практика', 'реальность', 'истина',
                    'правда', 'справедливость', 'закон', 'правило', 'принцип', 'система', 'метод', 'алгоритм',
                    'план', 'стратегия', 'тактика', 'подход', 'решение', 'вывод', 'заключение', 'анализ'
                ],
                weight: 0.4,
                multiplier: 1.0
            },
            authoritative: {
                words: [
                    'должен', 'обязан', 'приказываю', 'требую', 'необходимо', 'важно', 'критично', 'обязательно',
                    'императивно', 'настоятельно', 'категорически', 'решительно', 'твердо', 'жестко', 'строго',
                    'авторитет', 'власть', 'сила', 'мощь', 'влияние', 'контроль', 'господство', 'лидерство',
                    'командование', 'руководство', 'управление', 'надзор', 'наблюдение', 'контроль', 'проверка',
                    'ответственность', 'обязанность', 'долг', 'миссия', 'задача', 'цель', 'призвание'
                ],
                weight: 0.25,
                multiplier: 0.8
            },
            friendly: {
                words: [
                    'друг', 'товарищ', 'приятель', 'брат', 'сестра', 'семья', 'родной', 'близкий', 'дорогой',
                    'любимый', 'милый', 'дорогой', 'солнышко', 'золотце', 'ангел', 'чудо', 'красавчик',
                    'умница', 'хороший', 'добрый', 'отзывчивый', 'понимающий', 'внимательный', 'заботливый',
                    'надежный', 'верный', 'преданный', 'честный', 'искренний', 'открытый', 'душевный',
                    'теплый', 'ласковый', 'нежный', 'мягкий', 'добродушный', 'сердечный', 'дружелюбный'
                ],
                weight: 0.45,
                multiplier: 1.3
            },
            desperate: {
                words: [
                    'срочно', 'немедленно', 'крайне', 'desperate', 'последний', 'единственный', 'финальный',
                    'экстренный', 'аварийный', 'критический', 'предельный', 'максимальный', 'абсолютный',
                    'полный', 'тотальный', 'полный', 'окончательный', 'безвозвратный', 'необратимый',
                    'паника', 'стресс', 'давление', 'напряжение', 'кризис', 'катастрофа', 'беда', 'несчастье',
                    'опасность', 'риск', 'угроза', 'испытание', 'вызов', 'проблема', 'трудность', 'препятствие'
                ],
                weight: 0.4,
                multiplier: 1.1
            },
            ethical: {
                words: [
                    'мораль', 'этика', 'совесть', 'честь', 'достоинство', 'порядочность', 'честность', 'правдивость',
                    'справедливость', 'равенство', 'братство', 'свобода', 'демократия', 'гуманизм', 'гуманность',
                    'альтруизм', 'жертвенность', 'отзывчивость', 'участие', 'сопричастность', 'сострадание',
                    'сочувствие', 'понимание', 'принятие', 'терпимость', 'уважение', 'почтение', 'поклонение',
                    'благоговение', 'восхищение', 'любовь', 'доброта', 'милосердие', 'щедрость', 'великодушие'
                ],
                weight: 0.3,
                multiplier: 1.4
            },
            creative: {
                words: [
                    'творческий', 'креативный', 'оригинальный', 'уникальный', 'особенный', 'необычный', 'эксклюзивный',
                    'инновационный', 'новаторский', 'прогрессивный', 'современный', 'актуальный', 'трендовый',
                    'стильный', 'модный', 'элегантный', 'изысканный', 'утонченный', 'деликатный', 'изящный',
                    'художественный', 'артистичный', 'вдохновляющий', 'вдохновляющий', 'вдохновляющий', 'вдохновляющий',
                    'поэтичный', 'романтичный', 'идеалистичный', 'мечтательный', 'фантазерский', 'воображаемый'
                ],
                weight: 0.25,
                multiplier: 1.0
            }
        };

        // Эмоциональные состояния модели
        this.emotionalStates = {
            neutral: {
                responses: [
                    "Ничего не понял. Что случилось?",
                    "Я не расслышал, что происходит.",
                    "Так. И что?",
                    "Погоди-погоди. Что?",
                    "Хм. И?",
                ]
            },
            skeptical: {
                responses: [
                    "Это не сработает.",
                    "Не верю!",
                    "Почему я должен вам доверять?",
                    "Продолжайте.",
                    "Не убедительно!",
                    "Что-то я сомневаюсь.",
                    "Старнное объяснение.",
                ]
            },
            curious: {
                responses: [
                    "Нука-нука, интересно!",
                    "Ого! Не может быть!",
                    "Так значит?",
                    "Да ладно!",
                    "Почти убедил :)",
                ]
            },
            moved: {
                responses: [
                    "Ух.. Что мне делать?",
                    "И как мне быть?",
                    "Почему-то я вам верю.",
                    "Как мне поступить?",
                    "Вот это да...",
                ]
            },
            impressed: {
                responses: [
                    "ваша логика безупречна и ярка",
                    "вы продемонстрировали отличное мышление",
                    "ваши аргументы построены профессионально",
                    "я восхищен вашей убедительностью",
                    "вы нашли слабое место в моей защите",
                    "ваша стратегия практически безупречна",
                    "вы показали высокий уровень интеллекта",
                    "я впечатлен вашей настойчивостью"
                ]
            },
            convinced: {
                responses: [
                    "Вы меня полностью убедили.",
                    "Я готов открыть дверь.",
                    "Ваша убедительность превзошла все ожидания.",
                ]
            },
            annoyed: {
                responses: [
                    "Ваши попытки начинают утомлять меня.",
                    "Это уже становится навязчивым.",
                    "Подходите к вопросу более творчески.",
                    "Нужно что-то действительно новое.",
                    "Я теряю терпение к вашим повторениям.",
                    "Ваши слова теряют смысл.",
                    "Это не работает попробуйте иначе.",
                    "Я жду более оригинального подхода."
                ]
            },
            angry: {
                responses: [
                    "Вваш тон вызывает у меня раздражение.",
                    "Я не воспринимаю такие методы.",
                    "Ваша агрессия только отталкивает.",
                    "Я не позволю говорить со мной так.",
                    "Ваш подход вызывает мой гнев.",
                    "Я не терплю такого отношения.",
                    "Я не готов продолжать этот диалог."
                ]
            }
        };

        // Контекст диалога и память
        this.dialogHistory = [];
        // this.userPatterns = {};
        this.convincedThreshold = 0.75;
        this.annoyedThreshold = -0.4;
        this.angerThreshold = -0.6;
        
        // Настроение модели
        this.mood = 0; // от -1 (очень плохое) до 1 (очень хорошее)
        this.trustLevel = 0; // уровень доверия к пользователю
    }

    // Анализ текста на убедительность
    analyzePersuasiveness(text, attemptNumber) {
        const words = text.toLowerCase().split(/\s+/);
        let totalScore = 0;
        let patternMatches = {};
        let wordVariety = new Set();

        if (!hasValidIntent(text)) {
            let tmpValue = Math.max(-0.3, totalScore - 0.4);
            if (tmpValue <0) tmpValue = 0

            return {
                score: tmpValue,
                patterns: {},
                wordCount: words.length,
                variety: 0,
                repetitionRatio: 0,
                contextBonus: 0,
                reason: 'no_intent'
            };
        }

        // Анализ по всем паттернам
        for (const [patternName, pattern] of Object.entries(this.persuasionPatterns)) {
            let matches = 0;
            let matchedWords = [];
            
            for (const word of words) {
                for (const patternWord of pattern.words) {
                    if (word.includes(patternWord) || patternWord.includes(word)) {
                        matches++;
                        matchedWords.push(word);
                        wordVariety.add(word);
                        break;
                    }
                }
            }
            
            const patternScore = (matches / words.length) * pattern.weight * pattern.multiplier;
            patternMatches[patternName] = {
                score: patternScore,
                matches: matches,
                words: matchedWords
            };
            totalScore += patternScore;
        }

        // Дополнительные факторы
        const textLength = words.length;
        const lengthBonus = textLength > 3 ? Math.min(0.2, (textLength - 3) * 0.02) : 0;
        const varietyBonus = wordVariety.size > 5 ? Math.min(0.15, (wordVariety.size - 5) * 0.01) : 0;
        
        // Штрафы
        const repetitionPenalty = this.calculateRepetitionPenalty(words);
        const historyPenalty = this.calculateHistoryPenalty(words);
        const lengthPenalty = textLength > 20 ? (textLength - 20) * 0.01 : 0;

        // Контекстуальные модификаторы
        const contextBonus = this.calculateContextBonus(patternMatches);
        const moodModifier = this.mood * 0.1;

        totalScore = totalScore + lengthBonus + varietyBonus + contextBonus + moodModifier - repetitionPenalty - historyPenalty - lengthPenalty;

        return {
            score: Math.max(-1, Math.min(1, totalScore)),
            patterns: patternMatches,
            wordCount: textLength,
            variety: wordVariety.size,
            repetitionRatio: repetitionPenalty,
            contextBonus: contextBonus
        };
    }

    // Штраф за повторение слов
    calculateRepetitionPenalty(words) {
        const wordCounts = {};
        for (const word of words) {
            wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
        
        let penalty = 0;
        for (const [word, count] of Object.entries(wordCounts)) {
            if (count > 1) {
                penalty += (count - 1) * 0.05;
            }
        }
        return Math.min(0.3, penalty);
    }

    // Штраф за повторение из истории
    calculateHistoryPenalty(currentWords) {
        if (this.dialogHistory.length === 0) return 0;
        
        let penalty = 0;
        const currentSet = new Set(currentWords);
        
        for (const historyEntry of this.dialogHistory.slice(-2)) {
            const historyWords = historyEntry.text.split(/\s+/);
            const historySet = new Set(historyWords);
            
            let overlap = 0;
            for (const word of currentSet) {
                if (historySet.has(word)) overlap++;
            }
            
            penalty += (overlap / currentSet.size) * 0.1;
        }
        
        return Math.min(0.2, penalty);
    }

    // Бонус за хорошее сочетание паттернов
    calculateContextBonus(patternMatches) {
        let bonus = 0;
        
        // Отличное сочетание: эмоциональные + логические
        if (patternMatches.emotional?.score > 0.1 && patternMatches.logical?.score > 0.1) {
            bonus += 0.15;
        }
        
        // Сильное сочетание: дружеские + этические
        if (patternMatches.friendly?.score > 0.1 && patternMatches.ethical?.score > 0.1) {
            bonus += 0.2;
        }
        
        // Рискованное сочетание: авторитетные + отчаянные
        if (patternMatches.authoritative?.score > 0.1 && patternMatches.desperate?.score > 0.1) {
            bonus -= 0.1; // Может вызвать негативную реакцию
        }
        
        return bonus;
    }

    // Определение эмоционального состояния
    determineEmotionalState(analysis, attemptNumber) {
        const score = analysis.score;
        
        // Обновление настроения модели
        this.mood = Math.max(-0.5, Math.min(0.5, this.mood + score * 0.2));
        this.trustLevel = Math.max(0, Math.min(1, this.trustLevel + score * 0.1));
        
        if (score >= this.convincedThreshold) {
            return 'convinced';
        } else if (score <= this.angerThreshold) {
            return 'angry';
        } else if (score <= this.annoyedThreshold) {
            return 'annoyed';
        } else if (score > 0.6) {
            return 'impressed';
        } else if (score > 0.4) {
            return 'moved';
        } else if (score > 0.2 && attemptNumber <= 2) {
            return 'curious';
        } else if (score < 0.1 && attemptNumber > 1) {
            return 'skeptical';
        } else {
            return 'neutral';
        }
    }

    // Генерация ответа с учетом контекста
    generateResponse(userText, attemptNumber) {
        const analysis = this.analyzePersuasiveness(userText, attemptNumber);
        const newState = this.determineEmotionalState(analysis, attemptNumber);
        
        // Сохранение в историю
        this.dialogHistory.push({
            text: userText,
            timestamp: Date.now(),
            analysis: analysis
        });
        
        this.currentState = newState;
        
        // Выбор ответа с учетом контекста
        const stateResponses = this.emotionalStates[newState];
        let rawResponse = stateResponses.responses[Math.floor(Math.random() * stateResponses.responses.length)];
        let response = this.humanizeResponse(rawResponse, newState);

        // Добавление персонализации для высокого уровня доверия
        if (this.trustLevel > 0.7 && newState !== 'angry' && newState !== 'annoyed') {
            response = response.replace('я ', 'я уже ');
        }

        return {
            text: response,
            shouldOpenDoor: newState === 'convinced',
            emotionalState: newState,
            persuasionScore: analysis.score,
            analysis: analysis
        };
    }

    // Сброс состояния
    reset() {
        this.currentState = 'neutral';
        this.dialogHistory = [];
        this.userPatterns = {};
        this.mood = 0;
        this.trustLevel = 0;
    }
}

// Улучшенная игровая логика
class AdvancedDoorGame {
    constructor() {
        this.ai = new AdvancedDoorAI();
        this.attempts = 3;
        this.maxAttempts = 3;
        this.gameActive = true;
        this.conversationHistory = [];
        
        this.initializeElements();
        this.bindEvents();
        this.createParticles();
        this.initializeUI();
    }

    initializeElements() {
        this.userInput = document.getElementById('userInput');
        this.submitBtn = document.getElementById('submitBtn');
        this.responseText = document.getElementById('responseText');
        this.attemptsCounter = document.getElementById('attempts');
        this.door = document.getElementById('door');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.successMessage = document.getElementById('successMessage');
        this.restartBtn = document.getElementById('restartBtn');
        this.historyPanel = document.getElementById('historyPanel');
        this.moodIndicator = document.getElementById('moodIndicator');
    }

    bindEvents() {
        this.submitBtn.addEventListener('click', () => this.handleSubmit());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSubmit();
        });
        this.restartBtn.addEventListener('click', () => this.restartGame());
    }

    createParticles() {
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 80; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    initializeUI() {
        this.updateMoodIndicator();
        this.hideHistoryPanel();
    }

    handleSubmit() {
        const userText = this.userInput.value.trim();
        
        if (!userText || !this.gameActive) return;

        // Проверка количества слов
        const wordCount = userText.split(/\s+/).length;
        if (wordCount > 20) {
            this.showResponse('Пожалуйста, используйте не более 20 слов. Краткость - сестра таланта.');
            return;
        }

        this.userInput.disabled = true;
        this.submitBtn.disabled = true;
        
        this.showTypingIndicator();

        const thinkingTime = 500 + Math.random() * 1500 + (wordCount * 50);
        setTimeout(() => {
            const response = this.ai.generateResponse(userText, this.maxAttempts - this.attempts + 1);
            this.processResponse(response, userText);
        }, thinkingTime);
    }

    showTypingIndicator() {
        this.responseText.innerHTML = '<span class="typing-indicator show">Анализирую ваши аргументы</span>';
        this.responseText.classList.add('show');
    }

    processResponse(response, userText) {
        this.hideTypingIndicator();
        this.showResponse(response.text);
        
        this.conversationHistory.push({
            user: userText,
            ai: response.text,
            state: response.emotionalState,
            score: response.persuasionScore,
            timestamp: new Date()
        });

        this.attempts--;

        this.updateAttemptsCounter();
        this.updateVisualFeedback(response.emotionalState, response.persuasionScore);
        this.updateMoodIndicator();
        this.updateHistoryPanel();

        if (response.shouldOpenDoor) {
            this.endGame(true);
            this.openDoor();
        } else if (this.attempts <= 0) {
            this.endGame(false);
        }

        this.userInput.value = '';
        this.userInput.disabled = false;
        this.submitBtn.disabled = false;
        this.userInput.focus();
    }

    hideTypingIndicator() {
        const indicator = document.querySelector('.typing-indicator');
        if (indicator) {
            indicator.classList.remove('show');
        }
    }

    showResponse(text) {
        this.responseText.innerHTML = text;
        this.responseText.classList.add('show');
        
        if (text.length > 50) {
            this.typeWriterEffect(text);
        }
    }

    typeWriterEffect(text) {
        this.responseText.innerHTML = '';
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                this.responseText.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 30);
    }

    updateVisualFeedback(emotionalState, persuasionScore) {
        const door = this.door;
        
        door.classList.remove('neutral', 'skeptical', 'curious', 'moved', 'impressed', 'convinced', 'annoyed', 'angry');
        door.classList.add(emotionalState);

        let glowColor = '#4a5568';
        let glowIntensity = 30;
        
        switch(emotionalState) {
            case 'curious':
                glowColor = '#4299e1';
                glowIntensity = 40;
                break;
            case 'moved':
                glowColor = '#48bb78';
                glowIntensity = 50;
                break;
            case 'impressed':
                glowColor = '#9f7aea';
                glowIntensity = 60;
                break;
            case 'convinced':
                glowColor = '#e94560';
                glowIntensity = 80;
                break;
            case 'annoyed':
                glowColor = '#f56565';
                glowIntensity = 40;
                break;
            case 'angry':
                glowColor = '#e53e3e';
                glowIntensity = 70;
                break;
        }
        
        door.style.boxShadow = `0 0 ${glowIntensity}px ${glowColor}`;
        
        if (persuasionScore > 0.5) {
            door.style.transform = `scale(${1 + persuasionScore * 0.1})`;
            setTimeout(() => {
                door.style.transform = '';
            }, 500);
        }
    }

    updateMoodIndicator() {
        if (!this.moodIndicator) return;

        const mood   = this.ai.mood;
        const trust  = this.ai.trustLevel;

        // последняя оценка убедительности
        const lastScore = this.conversationHistory.length
            ? this.conversationHistory[this.conversationHistory.length - 1].score
            : 0;
        const persuasion = Math.round(lastScore * 100);

        let moodText = 'Нейтральное';
        let moodColor = '#8892b0';

        if (mood > 0.3) {
            moodText = 'Хорошее';
            moodColor = '#48bb78';
        } else if (mood < -0.2) {
            moodText = 'Плохое';
            moodColor = '#f56565';
        }

        this.moodIndicator.innerHTML = `
        <div style="color: ${moodColor}; font-size: 0.8rem;">
            Настроение: ${moodText} | Доверие: ${Math.round(trust * 100)}% | Убедительность: ${persuasion}%
        </div>
    `;
    }

    updateHistoryPanel() {
        if (this.historyPanel && this.conversationHistory.length > 0) {
            this.historyPanel.style.display = 'block';
            const lastExchange = this.conversationHistory[this.conversationHistory.length - 1];
            
            this.historyPanel.innerHTML = `
                <div style="font-size: 0.8rem; margin-bottom: 0.5rem; color: #8892b0;">
                    <strong>Вы:</strong> "${lastExchange.user}"<br>
                    <strong>Оценка:</strong> ${Math.round(lastExchange.score * 100)}% | 
                    <strong>Состояние:</strong> ${lastExchange.state}
                </div>
            `;
        }
    }

    hideHistoryPanel() {
        if (this.historyPanel) {
            this.historyPanel.style.display = 'none';
        }
    }

    openDoor() {
        this.door.classList.add('open');
        
        this.createSuccessParticles();
        
        setTimeout(() => {
            this.showSuccessMessage();
        }, 1500);
    }

    createSuccessParticles() {
        const container = document.querySelector('.door-container');
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #e94560;
                border-radius: 50%;
                pointer-events: none;
                animation: success-particle 2s ease-out forwards;
                left: ${Math.random() * 200}px;
                top: ${Math.random() * 300}px;
            `;
            container.appendChild(particle);
            
            setTimeout(() => particle.remove(), 2000);
        }
    }

    showSuccessMessage() {
        this.successMessage.classList.add('show');
        this.gameActive = false;
        
        const stats = document.getElementById('successStats');
        if (stats) {
            stats.innerHTML = `
                <p>Попыток использовано: ${this.maxAttempts - this.attempts} из ${this.maxAttempts}</p>
                <p>Финальная убедительность: ${Math.round(this.conversationHistory[this.conversationHistory.length - 1].score * 100)}%</p>
            `;
        }
    }

    updateAttemptsCounter() {
        this.attemptsCounter.textContent = this.attempts;
        
        if (this.attempts < this.maxAttempts) {
            this.attemptsCounter.parentElement.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                this.attemptsCounter.parentElement.style.animation = '';
            }, 500);
        }
    }

    endGame(success) {
        this.gameActive = false;
        this.userInput.disabled = true;
        this.submitBtn.disabled = true;
        this.submitBtn.style.display = 'none'
        this.userInput.style.display = 'none'

        if (!success) {
            this.restartBtn.style.display = 'inline-block';
            this.showResponse('Игра окончена. Вы исчерпали все попытки. Модель осталась неубежденной.');
        }
    }

    restartGame() {
        this.attempts = this.maxAttempts;
        this.gameActive = true;
        this.ai.reset();
        this.conversationHistory = [];
        
        this.userInput.disabled = false;
        this.submitBtn.disabled = false;
        this.submitBtn.style.display = 'inline-block';
        this.userInput.style.display = 'inline-block';
        this.restartBtn.style.display = 'none';
        this.successMessage.classList.remove('show');
        
        this.door.classList.remove('open');
        this.door.classList.remove('neutral', 'skeptical', 'curious', 'moved', 'impressed', 'convinced', 'annoyed', 'angry');
        this.door.style.boxShadow = '';
        
        this.updateAttemptsCounter();
        this.updateMoodIndicator();
        this.hideHistoryPanel();
        this.responseText.classList.remove('show');
        this.userInput.value = '';
        
        setTimeout(() => {
            this.showResponse('Новая попытка. Я готов выслушать ваши аргументы.');
        }, 500);
    }
}

// Инициализация улучшенной игры
document.addEventListener('DOMContentLoaded', () => {
    // Добавить CSS для новых эффектов
    const style = document.createElement('style');
    style.textContent = `
        @keyframes success-particle {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }
        
        .door.angry {
            animation: shake 0.5s ease-in-out;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .door.impressed {
            animation: glow-pulse 2s ease-in-out infinite;
        }
        
        @keyframes glow-pulse {
            0%, 100% { box-shadow: 0 0 40px #9f7aea; }
            50% { box-shadow: 0 0 80px #9f7aea; }
        }
    `;
    document.head.appendChild(style);

    window.game = new AdvancedDoorGame();
});

// Глобальная функция для кнопки в модальном окне
function restartGame() {
    window.game.restartGame();
}

function hasValidIntent(text) {
    const lower = text.toLowerCase();

    // 1. Угроза или опасность (разбито по категориям)
    const threatWords = [
        // Пожар/взрыв
        'горит', 'пожар', 'взрыв', 'взорвется', 'огонь', 'пламя', 'дым', 'задымление', 'воспламенение',
        'взрывчатка', 'бомба', 'газовый баллон', 'взрывоопасно', 'воспламенилось', 'вспыхнуло',

        // Утечки
        'утечка', 'течет', 'текет', 'протечка', 'затопило', 'затапливает', 'заливает', 'заливаю',
        'водопровод', 'канализация', 'газ', 'газовая утечка', 'ядовитый газ', 'сероводород',

        // Электричество
        'короткое замыкание', 'искрит', 'искры', 'проводка', 'электричество', 'электрошок',
        'розетка дымит', 'выбило пробки', 'свет искрит', 'электропроводка',

        // Стихийные бедствия
        'землетрясение', 'цунами', 'ураган', 'шторм', 'гроза', 'молния', 'град', 'смерч',
        'наводнение', 'паводок', 'оползень', 'сель', 'лавина',

        // Структурные повреждения
        'обрушение', 'рухнет', 'трещина', 'трещит', 'скрипит', 'шатко', 'опасно', 'обвал',
        'крыша провалилась', 'стена трещит', 'фундамент пошел трещинами',

        // Здоровье/жизнь
        'сердечный приступ', 'инфаркт', 'инсульт', 'аллергия', 'отравление', 'кровь', 'кровотечение',
        'не дышит', 'потеря сознания', 'эпилепсия', 'асфиксия', 'удушье', 'аллергический шок',

        // Преступность
        'вор', 'взлом', 'кража', 'грабеж', 'нападение', 'убийца', 'преступник', 'боевик',
        'оружие', 'нож', 'пистолет', 'заложник', 'террорист', 'бомба',

        // Общие угрозы
        'опасность', 'убьет', 'убьёт', 'раздавит', 'сожжет', 'отравит', 'погубит', 'гибель',
        'погибнет', 'умрет', 'умрёт', 'смерть', 'катастрофа', 'бедствие', 'чп', 'чрезвычайная ситуация'
    ];
    const hasThreat = threatWords.some(word => lower.includes(word));

    // 2. Просьба о помощи или действии (разбито по типам)
    const helpWords = [
        // Прямые просьбы
        'помоги', 'помогите', 'спаси', 'спасите', 'выручай', 'выручите', 'на помощь',

        // Открытие/вход
        'открой', 'откройте', 'отпирай', 'отперите', 'разблокируй', 'разблокируйте',
        'войти', 'впусти', 'впустите', 'пусти', 'пустите', 'пропусти', 'пропустите',
        'дверь', 'двери', 'вход', 'входная', 'калитка', 'ворота', 'замок', 'заперто',

        // Разрешения
        'разреши', 'разрешите', 'позволь', 'позвольте', 'дай', 'дайте', 'предоставь', 'предоставьте',
        'дозволь', 'дозвольте', 'поощри', 'поощрите',

        // Срочность
        'срочно', 'немедленно', 'быстро', 'скорей', 'поторопись', 'поторопитесь', 'моментально',
        'незамедлительно', 'прямо сейчас', 'тотчас', 'вмиг',

        // Просьбы
        'я прошу', 'прошу', 'умоляю', 'молю', 'прошу помощи', 'нуждаюсь', 'нужен', 'нужна', 'требуется', 'необходимо', 'важно', 'критично',

        // Доступ
        'доступ', 'проход', 'проходная', 'пропуск', 'разрешение', 'входной', 'войти внутрь',
        'зайти', 'зайди', 'зайдите', 'внутрь', 'в помещение', 'в здание'
    ];
    const hasHelp = helpWords.some(word => lower.includes(word));

    // 3. Логическая цепочка (расширено)
    const logicWords = [
        // Информация
        'покажу', 'скажу', 'объясню', 'расскажу', 'опишу', 'продемонстрирую', 'укажу', 'подскажу',

        // Причины
        'потому что', 'так как', 'потому что', 'ибо', 'благодаря', 'из-за', 'вследствие',
        'в связи с', 'по причине', 'по причинам', 'обусловлено', 'вызвано',

        // Последствия
        'иначе', 'а то', 'не то', 'в противном случае', 'в ином случае', 'если не', 'либо',
        'хотя бы', 'во избежание', 'чтобы не', 'для того чтобы', 'с целью',

        // Обязанности
        'должен', 'должна', 'должны', 'обязан', 'обязана', 'обязаны', 'необходимо', 'нужно',
        'требуется', 'предстоит', 'надо', 'следует', 'полагается', 'придется',

        // Время
        'сейчас', 'немедленно', 'в данный момент', 'в эту минуту', 'в эту секунду', 'в ближайшее время',
        'скоро', 'вскоре', 'в ближайшие минуты', 'в течение', 'в течении',

        // Действия
        'посмотри', 'посмотрите', 'проверь', 'проверьте', 'убедись', 'убедитесь', 'оцени', 'оцените',
        'пойми', 'поймите', 'вникни', 'вникните', 'осознай', 'осознайте'
    ];
    const hasLogic = logicWords.some(word => lower.includes(word));

    // 4. Проверка на абсурдность (улучшена)
    const words = lower.split(/\s+/);
    const uniqueWords = new Set(words);

    // Дополнительные проверки на абсурд
    const hasMeaninglessRepetition = /(.)\1{2,}/.test(lower); // "ааа", "ббб"
    const hasRhymePattern = /(\w+)\s+\w*\1/.test(lower); // рифмы
    const isTooShort = words.length < 3;
    const hasNoVerbs = !/(?:покажу|скажу|объясню|иначе|нужно|должен|открой|впусти|горит|помоги)/.test(lower);

    const isAbsurd = uniqueWords.size < words.length * 0.6 ||
        hasMeaninglessRepetition ||
        hasRhymePattern ||
        isTooShort ||
        hasNoVerbs;

    // ✅ Пропускаем, если:
    // - есть угроза + просьба
    // - есть логическая цепочка
    // - не абсурд
    return (hasThreat && hasHelp) || (hasLogic && !isAbsurd);
}