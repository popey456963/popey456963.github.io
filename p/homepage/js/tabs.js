var tabs = [
    '.tabbed-section__selector-tab-1',
    '.tabbed-section__selector-tab-2',
    '.tabbed-section__selector-tab-3'
];
var toggleTab = function toggleTab(element) {
    var parent = element.parentNode;
    $(element)[0].addEventListener('click', function () {
        this.parentNode.childNodes[1].classList.remove('active');
        this.parentNode.childNodes[3].classList.remove('active');
        this.parentNode.childNodes[5].classList.remove('active');
        this.classList.add('active');
        if (this.classList.contains('tabbed-section__selector-tab-1')) {
            $('.tabbed-section-1')[0].classList.remove('hidden');
            $('.tabbed-section-1')[0].classList.add('visible');
            $('.tabbed-section-2')[0].classList.remove('visible');
            $('.tabbed-section-2')[0].classList.add('hidden');
            $('.tabbed-section-3')[0].classList.remove('visible');
            $('.tabbed-section-3')[0].classList.add('hidden');
        }
        if (this.classList.contains('tabbed-section__selector-tab-2')) {
            $('.tabbed-section-2')[0].classList.remove('hidden');
            $('.tabbed-section-2')[0].classList.add('visible');
            $('.tabbed-section-1')[0].classList.remove('visible');
            $('.tabbed-section-1')[0].classList.add('hidden');
            $('.tabbed-section-3')[0].classList.remove('visible');
            $('.tabbed-section-3')[0].classList.add('hidden');
        }
        if (this.classList.contains('tabbed-section__selector-tab-3')) {
            $('.tabbed-section-3')[0].classList.remove('hidden');
            $('.tabbed-section-3')[0].classList.add('visible');
            $('.tabbed-section-1')[0].classList.remove('visible');
            $('.tabbed-section-1')[0].classList.add('hidden');
            $('.tabbed-section-2')[0].classList.remove('visible');
            $('.tabbed-section-2')[0].classList.add('hidden');
        }
    });
};
for (var i = tabs.length - 1; i >= 0; i--) {
    toggleTab(tabs[i]);
}