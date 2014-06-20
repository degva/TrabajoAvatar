function saveFinalScore() {
    localStorage.setItem(getFinalScoreDate(), getTotalScore());
    showBestScores();
    removeNoBestScores();
}
function showBestScores() {
    var bestScores = getBestScoreKeys();
    var bestScoresList = document.getElementById('puntuaciones');
    if (bestScoresList) {
        clearList(bestScoresList);
        for (var i=0; i < bestScores.length; i++) {
            addListElement(bestScoresList, bestScores[i], i==0?'negrita':null);
            addListElement(bestScoresList, localStorage.getItem(bestScores[i]), i==0?'negrita':null);
        }
    }
}