// Mobile menu toggle
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            });
        });

        // Add shadow to navbar on scroll
        window.addEventListener('scroll', function() {
            const nav = document.querySelector('nav');
            if (window.scrollY > 50) {
                nav.classList.add('shadow-lg');
            } else {
                nav.classList.remove('shadow-lg');
            }
        });

        // Project card hover effect
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                const img = this.querySelector('img');
                img.style.transform = 'scale(1.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                const img = this.querySelector('img');
                img.style.transform = 'scale(1)';
            });
        });

        // Video Player Functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Featured Video Controls
            const featuredVideo = document.getElementById('featured-video');
            const featuredOverlay = document.getElementById('featured-overlay');
            const featuredPlayBtn = document.getElementById('featured-play');
            const featuredPlayPauseBtn = document.getElementById('featured-play-pause');
            const featuredProgress = document.getElementById('featured-progress');
            const featuredProgressFilled = document.getElementById('featured-progress-filled');
            const featuredTimeDisplay = document.getElementById('featured-time');
            const featuredVolumeBtn = document.getElementById('featured-volume');
            const featuredVolumeSlider = document.getElementById('featured-volume-slider');
            const featuredFullscreenBtn = document.getElementById('featured-fullscreen');
            
            // Play/Pause Featured Video
            featuredPlayBtn.addEventListener('click', function() {
                featuredVideo.play();
                featuredOverlay.classList.add('hidden');
                featuredPlayPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            });
            
            featuredPlayPauseBtn.addEventListener('click', function() {
                if (featuredVideo.paused) {
                    featuredVideo.play();
                    this.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    featuredVideo.pause();
                    this.innerHTML = '<i class="fas fa-play"></i>';
                }
            });
            
            // Update progress bar
            featuredVideo.addEventListener('timeupdate', function() {
                const percent = (featuredVideo.currentTime / featuredVideo.duration) * 100;
                featuredProgressFilled.style.width = `${percent}%`;
                
                // Update time display
                const currentMinutes = Math.floor(featuredVideo.currentTime / 60);
                const currentSeconds = Math.floor(featuredVideo.currentTime % 60);
                const durationMinutes = Math.floor(featuredVideo.duration / 60);
                const durationSeconds = Math.floor(featuredVideo.duration % 60);
                
                featuredTimeDisplay.textContent = 
                    `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds} / 
                    ${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
            });
            
            // Click on progress bar to seek
            featuredProgress.addEventListener('click', function(e) {
                const pos = (e.pageX - this.getBoundingClientRect().left) / this.offsetWidth;
                featuredVideo.currentTime = pos * featuredVideo.duration;
            });
            
            // Volume control
            featuredVolumeBtn.addEventListener('click', function() {
                if (featuredVideo.volume > 0) {
                    featuredVideo.volume = 0;
                    this.innerHTML = '<i class="fas fa-volume-mute"></i>';
                } else {
                    featuredVideo.volume = featuredVolumeSlider.value;
                    this.innerHTML = '<i class="fas fa-volume-up"></i>';
                }
            });
            
            featuredVolumeSlider.addEventListener('input', function() {
                featuredVideo.volume = this.value;
                if (this.value == 0) {
                    featuredVolumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                } else {
                    featuredVolumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                }
            });
            
            // Fullscreen
            featuredFullscreenBtn.addEventListener('click', function() {
                if (featuredVideo.requestFullscreen) {
                    featuredVideo.requestFullscreen();
                } else if (featuredVideo.webkitRequestFullscreen) {
                    featuredVideo.webkitRequestFullscreen();
                } else if (featuredVideo.msRequestFullscreen) {
                    featuredVideo.msRequestFullscreen();
                }
            });
            
            // Reset overlay when video ends
            featuredVideo.addEventListener('ended', function() {
                featuredOverlay.classList.remove('hidden');
                featuredPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            });
            
            // Video Grid Items
            const videoCards = document.querySelectorAll('.video-card .video-container');
            const videoModal = document.getElementById('video-modal');
            const modalVideo = document.getElementById('modal-video');
            const closeModalBtn = document.getElementById('close-modal');
            
            videoCards.forEach(card => {
                const video = card.querySelector('video');
                const overlay = card.querySelector('.video-overlay');
                const playBtn = card.querySelector('.play-button');
                
                playBtn.addEventListener('click', function() {
                    // Open modal with this video
                    modalVideo.src = video.querySelector('source').src;
                    modalVideo.poster = video.poster;
                    videoModal.classList.add('active');
                    modalVideo.play();
                });
            });
            
            // Close modal
            closeModalBtn.addEventListener('click', function() {
                videoModal.classList.remove('active');
                modalVideo.pause();
            });
            
            // Close modal when clicking outside
            videoModal.addEventListener('click', function(e) {
                if (e.target === videoModal) {
                    videoModal.classList.remove('active');
                    modalVideo.pause();
                }
            });
            
            // Play videos on hover (muted)
            videoCards.forEach(card => {
                const video = card.querySelector('video');
                
                card.addEventListener('mouseenter', function() {
                    video.muted = true;
                    video.play().catch(e => console.log(e));
                });
                
                card.addEventListener('mouseleave', function() {
                    video.pause();
                    video.currentTime = 0;
                });
            });
        });