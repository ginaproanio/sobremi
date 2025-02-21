// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: targetPosition - navHeight,
                behavior: 'smooth'
            });
        }
    });
});

// Reemplazamos la función fetchGitHubProjects con datos de ejemplo
async function fetchGitHubProjects() {
    const projectGrid = document.querySelector('.project-grid');
    const username = 'ginaproanio'; // Tu usuario de GitHub
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) throw new Error('Error al obtener los repositorios');
        
        const repos = await response.json();
        
        projectGrid.innerHTML = repos.map(repo => `
            <article class="project">
                <div class="project-content">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'Proyecto en desarrollo'}</p>
                    <div class="tech-stack">
                        ${repo.language ? `
                            <span class="tech-tag">
                                ${getIconForTechnology(repo.language)}
                                <span>${repo.language}</span>
                            </span>
                        ` : ''}
                    </div>
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank" class="github-link">
                            <i class="fa-brands fa-github"></i> Código
                        </a>
                        ${repo.homepage ? `
                            <a href="${repo.homepage}" target="_blank" class="demo-link">
                                <i class="fa-solid fa-external-link-alt"></i> Demo
                            </a>
                        ` : ''}
                    </div>
                </div>
            </article>
        `).join('');
    } catch (error) {
        console.error('Error:', error);
        projectGrid.innerHTML = `
            <div class="error-message">
                <p>No se pudieron cargar los proyectos. Por favor, visita directamente mi perfil de GitHub:</p>
                <a href="https://github.com/${username}" target="_blank" class="github-link">
                    <i class="fa-brands fa-github"></i> Ver perfil en GitHub
                </a>
            </div>
        `;
    }
}

// Función auxiliar para obtener el ícono correspondiente a cada tecnología
function getIconForTechnology(tech) {
    const iconMap = {
        'HTML': '<i class="fa-brands fa-html5"></i>',
        'CSS': '<i class="fa-brands fa-css3-alt"></i>',
        'JavaScript': '<i class="fa-brands fa-js"></i>',
        'TypeScript': '<i class="fa-brands fa-js"></i>',
        'Python': '<i class="fa-brands fa-python"></i>',
        'Java': '<i class="fa-brands fa-java"></i>',
        'PHP': '<i class="fa-brands fa-php"></i>',
        'Ruby': '<i class="fa-brands fa-gem"></i>',
        'Go': '<i class="fa-brands fa-golang"></i>',
        'Swift': '<i class="fa-brands fa-swift"></i>',
        'Kotlin': '<i class="fa-brands fa-android"></i>',
        'Rust': '<i class="fa-solid fa-gear"></i>',
        'C++': '<i class="fa-solid fa-code"></i>',
        'C#': '<i class="fa-solid fa-code"></i>',
        'Shell': '<i class="fa-solid fa-terminal"></i>',
        'Vue': '<i class="fa-brands fa-vuejs"></i>',
        'React': '<i class="fa-brands fa-react"></i>',
        'Angular': '<i class="fa-brands fa-angular"></i>',
        'Node.js': '<i class="fa-brands fa-node-js"></i>'
    };

    return iconMap[tech] || '<i class="fa-solid fa-code"></i>';
}

// Agregamos estilos para el mensaje de error
const style = document.createElement('style');
style.textContent = `
    .error-message {
        text-align: center;
        padding: 2rem;
        background: var(--card-bg);
        border-radius: 8px;
        margin: 1rem 0;
    }
    .error-message p {
        margin-bottom: 1rem;
        color: var(--text);
    }
    .error-message .github-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background: var(--primary);
        color: white;
        text-decoration: none;
        border-radius: 4px;
        transition: opacity 0.2s ease;
    }
    .error-message .github-link:hover {
        opacity: 0.9;
    }
`;
document.head.appendChild(style);

// Animación de entrada para elementos
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project, .skill-card').forEach(el => {
    observer.observe(el);
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubProjects();
});

// Pausa la animación cuando el cursor está sobre el carrusel
document.querySelector('.tech-carousel').addEventListener('mouseenter', function() {
    document.querySelector('.tech-track').style.animationPlayState = 'paused';
});

document.querySelector('.tech-carousel').addEventListener('mouseleave', function() {
    document.querySelector('.tech-track').style.animationPlayState = 'running';
});

// Resaltar sección activa en el menú
function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navHeight = document.querySelector('.nav').offsetHeight;
        
        if (window.pageYOffset >= (sectionTop - navHeight - 100)) {
            currentSection = '#' + section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
}

// Evento scroll para resaltar sección activa
window.addEventListener('scroll', highlightActiveSection);
