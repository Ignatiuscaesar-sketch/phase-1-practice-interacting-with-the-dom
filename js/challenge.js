document.addEventListener('DOMContentLoaded', function() {
    const counter = document.getElementById('counter');
    const minus = document.getElementById('minus');
    const plus = document.getElementById('plus');
    const heart = document.getElementById('heart');
    const pause = document.getElementById('pause');
    const likes = document.querySelector('.likes');
    const commentForm = document.getElementById('comment-form');

    let count = 0;
    let isPaused = false;
    let timer = setInterval(incrementCounter, 1000);

    function incrementCounter() {
        if (!isPaused) {
            counter.innerText = ++count;
        }
    }

    function togglePause() {
        isPaused = !isPaused;
        pause.innerText = isPaused ? 'resume' : 'pause';
        [minus, plus, heart].forEach(btn => btn.disabled = isPaused);
        if (!isPaused) timer = setInterval(incrementCounter, 1000);
        else clearInterval(timer);
    }

    minus.onclick = () => { if (!isPaused) counter.innerText = --count; };
    plus.onclick = () => { if (!isPaused) counter.innerText = ++count; };
    heart.onclick = () => {
        if (!isPaused) {
            let existingLike = document.querySelector(`[data-num='${count}']`);
            if (existingLike) {
                let times = existingLike.querySelector('span');
                times.innerText = parseInt(times.innerText) + 1;
                existingLike.querySelector('span').innerText = `${times.innerText} times`;
            } else {
                let newLike = document.createElement('li');
                newLike.dataset.num = count;
                newLike.innerHTML = `${count} has been liked <span>1</span> time`;
                likes.appendChild(newLike);
            }
        }
    };
    pause.onclick = togglePause;
    commentForm.onsubmit = function(e) {
        e.preventDefault();
        let comment = document.createElement('p');
        comment.innerText = e.target.elements.comment.value;
        document.querySelector('.comments').appendChild(comment);
        e.target.elements.comment.value = '';
    };
});
