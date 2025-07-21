// Game state
        const state = {
            hunger: 80,
            happiness: 90,
            energy: 75,
            hygiene: 85,
            day: 1,
            petType: 'default',
            petName: 'Fluffy'
        };

        // DOM elements
        const hungerBar = document.getElementById('hunger-bar');
        const happinessBar = document.getElementById('happiness-bar');
        const energyBar = document.getElementById('energy-bar');
        const hygieneBar = document.getElementById('hygiene-bar');
        const hungerValue = document.getElementById('hunger-value');
        const happinessValue = document.getElementById('happiness-value');
        const energyValue = document.getElementById('energy-value');
        const hygieneValue = document.getElementById('hygiene-value');
        const dayCounter = document.getElementById('day-counter');
        const petStatus = document.getElementById('pet-status');
        const petName = document.getElementById('pet-name');
        const petFace = document.getElementById('pet-face');
        const petMouth = document.getElementById('pet-mouth');
        const messageContainer = document.getElementById('message-container');
        const messageText = document.getElementById('message-text');
        const petNameInput = document.getElementById('pet-name-input');

        // Action buttons
        document.getElementById('feed-btn').addEventListener('click', feed);
        document.getElementById('play-btn').addEventListener('click', play);
        document.getElementById('sleep-btn').addEventListener('click', sleep);
        document.getElementById('clean-btn').addEventListener('click', clean);
        document.getElementById('pet-btn').addEventListener('click', pet);
        document.getElementById('name-change-btn').addEventListener('click', changeName);
        document.getElementById('close-message').addEventListener('click', () => {
            messageContainer.classList.add('hidden');
        });

        // Pet selection
        document.querySelectorAll('.pet-select').forEach(btn => {
            btn.addEventListener('click', function() {
                const petType = this.getAttribute('data-pet');
                const petImage = document.getElementById('pet-image');
                if (petType === 'dog') {
                    petImage.src = 'cute dog.png'; // Make sure this file exists!
                    petImage.alt = 'Dog';
                } else if (petType === 'cat') {
                    petImage.src = 'cute cat.png';
                    petImage.alt = 'Cat';
                } else if (petType === 'bunny') {
                    petImage.src = 'cute bunny.png';
                    petImage.alt = 'Bunny';
                }
            });
        });

        // Update stats display
        function updateStats() {
            hungerBar.style.width = `${state.hunger}%`;
            happinessBar.style.width = `${state.happiness}%`;
            energyBar.style.width = `${state.energy}%`;
            hygieneBar.style.width = `${state.hygiene}%`;
            
            hungerValue.textContent = `${state.hunger}%`;
            happinessValue.textContent = `${state.happiness}%`;
            energyValue.textContent = `${state.energy}%`;
            hygieneValue.textContent = `${state.hygiene}%`;
            
            dayCounter.textContent = state.day;
            petName.textContent = state.petName;
            
            // Update status text based on stats
            let status = '';
            if (state.hunger < 30) status += 'Very hungry, ';
            else if (state.hunger < 60) status += 'Hungry, ';
            else status += 'Well-fed, ';
            
            if (state.happiness < 30) status += 'very unhappy ';
            else if (state.happiness < 60) status += 'a bit sad ';
            else status += 'happy ';
            
            if (state.energy < 30) status += 'and exhausted!';
            else if (state.energy < 60) status += 'and a bit tired!';
            else status += 'and energetic!';
            
            petStatus.textContent = status;
            
            // Update pet face based on happiness
            if (state.happiness < 30) {
                petMouth.className = 'absolute bottom-10 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-pink-300';
            } else if (state.happiness < 60) {
                petMouth.className = 'absolute bottom-10 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-pink-300 rounded-full';
            } else {
                petMouth.className = 'absolute bottom-10 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-pink-300 rounded-b-full';
            }
        }

        // Actions
        function feed() {
            state.hunger = Math.min(100, state.hunger + 20);
            state.hygiene = Math.max(0, state.hygiene - 5);
            nextDay();
            showMessage('Yummy! Thanks for the food!');
            animateButton('feed-btn');
        }

        function play() {
            state.happiness = Math.min(100, state.happiness + 15);
            state.energy = Math.max(0, state.energy - 10);
            state.hunger = Math.max(0, state.hunger - 5);
            nextDay();
            showMessage('That was so much fun! Play again?');
            animateButton('play-btn');
        }

        function sleep() {
            state.energy = Math.min(100, state.energy + 30);
            state.hunger = Math.max(0, state.hunger - 10);
            nextDay();
            showMessage('Zzz... I feel so rested now!');
            animateButton('sleep-btn');
        }

        function clean() {
            state.hygiene = Math.min(100, state.hygiene + 25);
            state.happiness = Math.max(0, state.happiness - 5);
            nextDay();
            showMessage('Ahhh, I feel so fresh and clean now!');
            animateButton('clean-btn');
        }

        function pet() {
            state.happiness = Math.min(100, state.happiness + 10);
            nextDay();
            showMessage('I love your cuddles! You\'re the best!');
            animateButton('pet-btn');
        }

        function changeName() {
            const newName = petNameInput.value.trim();
            if (newName) {
                state.petName = newName;
                showMessage(`I love my new name, ${newName}!`);
            }
            updateStats();
        }

        // Helper functions
        function nextDay() {
            state.day++;
            
            // Natural stat changes over time
            state.hunger = Math.max(0, state.hunger - 5);
            state.happiness = Math.max(0, state.happiness - 3);
            state.energy = Math.max(0, state.energy - 2);
            state.hygiene = Math.max(0, state.hygiene - 4);
            
            updateStats();
        }

        function showMessage(text) {
            messageText.textContent = text;
            messageContainer.classList.remove('hidden');
            
            // Auto-hide message after 5 seconds
            setTimeout(() => {
                if (!messageContainer.classList.contains('hidden')) {
                    messageContainer.classList.add('hidden');
                }
            }, 5000);
        }

        function animateButton(buttonId) {
            const button = document.getElementById(buttonId);
            button.classList.add('bounce-animation');
            setTimeout(() => {
                button.classList.remove('bounce-animation');
            }, 1000);
        }

        function updatePetAppearance() {
            // Reset to default
            petFace.className = 'w-48 h-48 bg-yellow-200 rounded-full relative';
            
            // Change based on pet type
            if (state.petType === 'dog') {
                petFace.className = 'w-48 h-48 bg-amber-200 rounded-full relative';
            } else if (state.petType === 'cat') {
                petFace.className = 'w-48 h-48 bg-gray-300 rounded-full relative';
            } else if (state.petType === 'bunny') {
                petFace.className = 'w-48 h-48 bg-white rounded-full relative border-2 border-pink-200';
            }
        }

        // Initialize
        updateStats();