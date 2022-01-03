
// window.open("/", "mywindow", "location=0, titlebar=0");
const container = document.getElementById("container")
const videoGalery = document.getElementById("video-galery")
const videoPlayer = document.getElementById("main-video-player")
const mainVideoTitle = document.getElementById("main-video__title")
const backButton = document.getElementById("backButton")
const logo = document.getElementById("logo")

function fixSize (){
    const mainVideo = document.querySelector(".main-video").clientHeight
    console.log("tamanho da div antes do play:", mainVideo);
    videoPlayer.addEventListener('play', (event) => {
        const _mainVideo = document.querySelector(".main-video").clientHeight
        console.log("tamanho da div após o play:", _mainVideo);
        document.querySelector("#video-galery").style.height = _mainVideo+"px"
    })

}
function revertFixSize (){
    document.querySelector("#video-galery").style.height = "auto"
}
function createElement(elementType,elementClass, parent, imageParams){
    const element = document.createElement(elementType); 
    element.classList.add(elementClass);
    if(imageParams != null){
        element.alt=imageParams.alt;
        element.src=imageParams.src; 
    }
    parent.appendChild(element);
    return(element);
}
allVideos.forEach((video)=>{
    const videoDiv = createElement('div',"vid",videoGalery, null)
    const videoThumb = createElement(
        'img',
        "img",
        videoDiv,
        {
            alt:video.title,
            src:`core/thubs/${video.slug}.png`
        }
    );
    const videoTitle = createElement('h3','video-list__title',videoDiv,null)
    videoTitle.innerText=`${video.title}`
    videoDiv.addEventListener("click", ()=>{
        playVideo(video)
        activeItem(videoDiv)
        fixSize()
    })
})
// <img src="core/thubs/default.png" alt="">
const videoList = document.querySelectorAll("body > div > div.video-list .vid")
function activeItem(videoItem){
    clearVideoItems()
    videoItem.classList.add("active")
}
function clearVideoItems(){
    videoList.forEach((videoItem)=>{
        videoItem.classList.remove("active")
    })
}
function playVideo(video){

    container.classList.add("playing")
    backButton.classList.add("active")
    videoPlayer.src=`core/videos/${video.slug}.mp4`
    mainVideoTitle.innerHTML=video.title
    logo.classList.add("active-animation")

    
    // videoPlayer.requestFullscreen();
    
}
function backToGaley (){
    container.classList.remove("playing")
    backButton.classList.remove("active")
    logo.classList.remove("active-animation")
    revertFixSize()
}
backButton.addEventListener("click",()=>{
    videoPlayer.pause()
    clearVideoItems()
    backToGaley()
})
// videoList.forEach((videoItem)=>{
//     videoItem.addEventListener("click",()=>{
//         playVideo(videoItem)
//         activeItem(videoItem)
//     })
// })

