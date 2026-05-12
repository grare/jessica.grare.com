//Top Nav
const currentPath = window.location.pathname;

const navTemplate = `
<nav class="flex justify-between items-center px-8 py-6 sticky top-0 bg-white/80 backdrop-blur-md z-50">
    <a href="/design/" class="block">
        <img src="images/JG_WithName@4x.png" alt="Jessica Grare" class="h-[80px] w-auto object-contain block">
    </a>
    <div class="flex items-center space-x-8 font-medium text-sm uppercase tracking-widest text-black">
        <a href="/design/" class="${currentPath.includes('/design') ? 'border-b-2 border-black' : 'hover:text-gray-500'} transition pb-1">Work</a>
        <a href="AboutDesigner.html" class="${currentPath.includes('AboutDesigner') ? 'border-b-2 border-black' : 'hover:text-gray-500'} transition pb-1">About</a>
        <a href="https://www.linkedin.com/in/jessicagrare" target="_blank" class="block hover:opacity-50 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="black">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
        </a>
    </div>
</nav>
`;

document.getElementById('global-nav').innerHTML = navTemplate;

//Bottom Nav
const footerTemplate = `
<footer class="max-w-[1400px] mx-auto px-8 mt-40 reveal">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 pb-24 border-b border-black/10">
        <div>
            <h3 class="text-xs uppercase tracking-[0.3em] font-black mb-6 text-gray-400">Get in Touch</h3>
            <a href="mailto:hello@jessicagrare.com" class="text-3xl md:text-5xl poppins-black uppercase hover:text-gray-500 transition-colors duration-300">
                hello@jessicagrare.com
            </a>
        </div>
        <div class="flex md:justify-end items-end">
            <p class="text-sm uppercase tracking-widest leading-relaxed text-right">
                Based in New York City<br>
                Available for Freelance & Art Direction
            </p>
        </div>
    </div>

    <div class="pt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
        <div>
            <span class="text-[10px] uppercase tracking-widest font-medium text-gray-400">Next Project</span>
            <a href="next-project.html" class="group block mt-4">
                <div class="flex items-center gap-8">
                    <h3 class="text-5xl md:text-8xl poppins-black uppercase leading-none italic md:not-italic group-hover:italic transition-all duration-300 ease-in-out">
                        Nike: Speed
                    </h3>
                    <svg width="60" height="40" viewBox="0 0 72 48" fill="none" class="transition-transform duration-500 group-hover:translate-x-6">        
                        <path d="M0 20H56L40 4L45 0L72 24L45 48L40 44L56 28H0V20Z" fill="black"/>
                    </svg>
                </div>
            </a>
        </div>
        <a href="/design/" class="text-[10px] font-regular uppercase tracking-widest border-b border-black pb-1 hover:text-gray-400 hover:border-gray-400 transition mb-2">Back to Home</a>
    </div>
</footer>
`;

document.getElementById('global-footer').innerHTML = footerTemplate;