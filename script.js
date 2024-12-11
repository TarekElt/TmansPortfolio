document.addEventListener('DOMContentLoaded', function() {
    var collapsibles = document.querySelectorAll('.collapsible, .sub-collapsible');

    collapsibles.forEach(function(collapsible) {
        collapsible.addEventListener('click', function() {
            var content = this.nextElementSibling;
            var triangle = this.querySelector('.triangle');

            if (content.style.display === 'block') {
                content.style.display = 'none';
                triangle.style.transform = 'rotate(0deg)';
            } else {
                content.style.display = 'block';
                triangle.style.transform = 'rotate(90deg)';
            }
        });
    });
});