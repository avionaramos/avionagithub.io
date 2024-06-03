function playSound(soundId) {
    var sound = document.getElementById(soundId);
    sound.currentTime = 0; // Reset sound to the beginning before playing
    sound.play();
}

document.addEventListener("DOMContentLoaded", function () {
    const audioElements = document.querySelectorAll("audio");

    audioElements.forEach(function (audio) {
        audio.addEventListener("play", function () {
            audioElements.forEach(function (otherAudio) {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                    otherAudio.currentTime = 0;
                }
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    function speakText(text) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    }

    // Event listener for the text-to-speech button
    const textToSpeechButton = document.getElementById("text-to-speech");
    if (textToSpeechButton) {
        textToSpeechButton.addEventListener("click", function () {
            const textInput = document.getElementById("text-input").value;
            if (textInput.trim() !== '') {
                speakText(textInput);
            } else {
                alert("Please enter some text.");
            }
        });
    }

    // Code for controlling audio playback
    const audioElements = document.querySelectorAll("audio");

    audioElements.forEach(function (audio) {
        audio.addEventListener("play", function () {
            audioElements.forEach(function (otherAudio) {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                    otherAudio.currentTime = 0;
                }
            });
        });
    });
});
