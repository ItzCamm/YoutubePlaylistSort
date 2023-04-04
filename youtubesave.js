//Pretty short script for organizing youtube videos into playlists,
//It may save you only a few clicks, but if you save thousands of videos it adds up/

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function saveAndDeleteVideos() {
    'use strict';
    var items = document.querySelectorAll('ytd-playlist-video-renderer.style-scope');

    for (var i = 0; i < items.length; i++) {
        const videoTitle = items[i].querySelector('div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > h3:nth-child(1) > a:nth-child(2)');
    console.log(`Processing video: ${videoTitle.textContent}`);
        // Click the three-dot menu
        const threeDotsButton = items[i].querySelector('ytd-menu-renderer yt-icon-button:nth-child(3) > button:nth-child(1)');
        threeDotsButton.click();
        await sleep(200);

        // Click playlist button
        const saveToPlaylistButton = document.querySelector('ytd-menu-service-item-renderer.style-scope:nth-child(3) > tp-yt-paper-item:nth-child(1)');
        if (saveToPlaylistButton) {
            saveToPlaylistButton.click();
            await sleep(500); // Adjust sleep time as needed for the user to choose a playlist
        }

    //promise to wait for user to press X
     await new Promise(async resolve => {
    const waitForDialogClose = async () => {
        const closeButton = document.querySelector('ytd-add-to-playlist-renderer yt-icon-button#close-button > button#button');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                resolve();
            }, { once: true });
        } else {
            await sleep(100);
            waitForDialogClose();
        }
    };
    waitForDialogClose();
});



        threeDotsButton.click();
        await sleep(200);

        const removeFromPlaylistButton = document.querySelector('ytd-menu-service-item-renderer.style-scope:nth-child(5) > tp-yt-paper-item:nth-child(1)');
        if (removeFromPlaylistButton) {
            removeFromPlaylistButton.click();
            await sleep(500); // sleep because the browser may not be able to handle the process immediately
        }
    }
}

saveAndDeleteVideos();
