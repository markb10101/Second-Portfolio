
// scroll page to top of browser reload
//window.onunload = function(){ window.scrollTo(0,0); }




/////////////////////////////////////////////////
// adjust some styling related to screenwidth
/////////////////////////////////////////////////

// run adjustments on pageload
window.onload = sizeStyleAdjustments;

// run adjustments when window resized
window.addEventListener("resize",sizeStyleAdjustments);


function sizeStyleAdjustments() {

    let deviceThreshold = 750;
    let widthFactor = (window.innerWidth-deviceThreshold)/7;

    // scale opacity of navbar to screenwidth
    // using rgba as opacity affected child elements
    let navBar = document.getElementById('big-nav');
    navBar.style.backgroundColor = `rgba(0, 255, 0, ${widthFactor}%)`;

    // here's a useless action
    // moving first nav/ul/li/a 
    //let firstA = navBar.firstElementChild.firstElementChild.firstElementChild
    //firstA.style.left = -widthFactor+"vw";

    // h1 rotation...
    // turns out accessing rotate part of transform in any
    // meaninful way is much more complcated than most other 'styles'!    
    
}

/////////////////////////////////////////////////