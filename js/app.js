// Austin Tobin FRH7486
// 635 Austin Tobin FRH7486 website1 JS
// Convert RGB or RGBA color string to color hex value
// Takes an rgb/rgba color string and returns a hex color string

function RGBToHex(rgb) {
    // Choose correct separator

    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]

    if(rgb.includes('a')){
        rgb = rgb.substr(5).split(")")[0].split(sep);
    }
    else{
        rgb = rgb.substr(4).split(")")[0].split(sep);
    }

    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);

    if (r.length == 1)
      r = "0" + r;

    if (g.length == 1)
      g = "0" + g;

    if (b.length == 1)
      b = "0" + b;

    return "#" + r + g + b;
}

// get the settings icon with JS
let settingsIcon = document.querySelector('#settings-icon');

settingsIcon.addEventListener('click', function(){

    // Show/Hide the settings pannel on click
    const preferencePanel = document.querySelector('#preference-panel');
    if (preferencePanel) {
        if (preferencePanel.style.display === 'block') {
            preferencePanel.style.display = 'none';
        }
        else {
            preferencePanel.style.display = 'block';
        }
    }
    else {
        console.log('bad stuff happens');
    }

})

document.getElementById('shadow-btn').addEventListener('click', function(){
    alert('Shadowed button was pressed! So very exciting.');
})


const burgerMenuIcon = document.querySelector('#burger-menu');
// console.log(burgerMenu);

burgerMenuIcon.addEventListener('click', function(){

    // Show/Hide the settings pannel on click
    const burgerMenu = document.querySelector('#main-nav-links');
    if (burgerMenu) {
        if (burgerMenu.style.display === 'block') {
            burgerMenu.style.display = 'none';
        }
        else {
            burgerMenu.style.display = 'block';
        }
    }
    else {
        console.log('bad stuff happens');
    }

})

const resetBtn = document.getElementById('reset-username-btn');
resetBtn.addEventListener('click',setUsername);

//function to set/reset the username
function setUsername(){
    let User = prompt("Please enter your user name");

    if (User){
        // console.log(User + 'if(User)');
        localStorage.setItem("username", User);
        document.getElementById('username').innerText = localStorage.username;
    }
    else{
        // console.log(User + 'else(User)');
        localStorage.setItem("username", 'Anonymous');
        document.getElementById('username').innerText = localStorage.username;
    }
}

function setPrefPanelInputs(settings){

    document.getElementById('prefs-bgColor').value = settings.bgColor;
    document.getElementById('prefs-font-color').value = settings.fontColor;
    document.getElementById('prefs-font-size').value = settings.fontSize;
    document.getElementById('font-size-display').innerText = settings.fontSize;
};

 // Create and save default settings on object page load
    var defaultSettings = {};
    let firstSection = document.getElementsByClassName('main-section')[0];

    // console.log("First section bg color: " + firstSection.style.color);

    let firstSectionComputedStyles = getComputedStyle(firstSection);
    defaultSettings.bgColor = RGBToHex(firstSectionComputedStyles.backgroundColor);
    defaultSettings.fontSize = parseInt(firstSectionComputedStyles.fontSize);
    defaultSettings.fontColor = RGBToHex(firstSectionComputedStyles.color);

    // console.log(defaultSettings);
    setPrefPanelInputs(defaultSettings);
    localStorage.setItem('defaultSettings',JSON.stringify(defaultSettings));

window.onload = function(){
    // check/Set username

    if (!localStorage.username){
        setUsername();
    }
    else{
        document.getElementById('username').innerText = localStorage.username;
    }

    // if there are user settings, apply them to the page and preference panel
    if(localStorage.userSettings){
        let pageSettings = JSON.parse(localStorage.userSettings);
        applySettings(pageSettings);
        setPrefPanelInputs(pageSettings);
    }
    // Create and save default settings on object page load
    // var defaultSettings = {};
    // let firstSection = document.getElementsByClassName('main-section')[0];

    // console.log("First section bg color: " + firstSection.style.color);

    // let firstSectionComputedStyles = getComputedStyle(firstSection);
    // defaultSettings.bgColor = RGBToHex(firstSectionComputedStyles.backgroundColor);
    // defaultSettings.fontSize = parseInt(firstSectionComputedStyles.fontSize);
    // defaultSettings.fontColor = RGBToHex(firstSectionComputedStyles.color);

    // console.log(defaultSettings);
    // setPrefPanelInputs(defaultSettings);
    // localStorage.setItem('defaultSettings',JSON.stringify(defaultSettings));

    // Test settings
    // test css settings to the page

    // let testSettings = {
    //     backgroundColor : 'green',
    //     fontColor : 'White',
    //     fontSize : 25
    // };

    // document.querySelector('#test-btn').addEventListener('click', function(){
    //     applySettings(testSettings);
    //     saveUserSettings(testSettings,'testSettings');

    //     console.log(getUserSettings('testSettings'));
    // });

    
    document.querySelector('#defaults-btn').addEventListener('click', function(){
        // if we have defaults apply settings
        if(localStorage.defaultSettings){
            let defaultSettings = JSON.parse(localStorage.defaultSettings);
            applySettings( defaultSettings);
            setPrefPanelInputs( defaultSettings);

            let result = confirm('press OK to save defaults as preferred settings \nOR \nCancel to keep saved settings');
            if (result){
                saveUserSettings(defaultSettings, 'userSettings');
            }
        }
        else{
            console.error('No defaults are in the local storage');
        }
    });

    
    // cancel button click
    document.querySelector('#cancel-btn').addEventListener('click', function(){
        // if temp setting exists
       if(tempSettings){
            if(localStorage.userSettings){
                let userSettings = JSON.parse(localStorage.userSettings);
                applySettings(userSettings);
                setPrefPanelInputs(userSettings);
            }
            else if(localStorage.defaultSettings){
                let defaultSettings = JSON.parse(localStorage.defaultSettings);
                applySettings( defaultSettings);
                setPrefPanelInputs( defaultSettings);
            }
            else{
                alert('No user or default settings found');
            }
       }
       else{
        alert('No changes have made in the preferences panel');
       }
    });

    // Settingso=Object is a settings object, keyName is the key
    // save user settings as a JSON to local storage with a given key
    function saveUserSettings(settingsObject, keyName){
        let settingsJSON = JSON.stringify(settingsObject);
        localStorage.setItem(keyName,settingsJSON);
    }


    // Retrieve user settings from local storage
    function getUserSettings(keyName){
        if (localStorage.getItem(keyName)){
        let variable = JSON.parse(localStorage.getItem(keyName));
        return variable;
        }
        else{
            console.error('The ' + keyName + ' does not exist');
            return null;
        }
    }

    
    //If user settings exist in local stroage, the apply to 
    // the page and use them to set preference panel values
    if (localStorage.userSettings){
        applySettings(JSON.parse(localStorage.userSettings));
    }

    // global temp settings
    var tempSettings = {};

    const prefPanel = document.getElementById('prefs-table').addEventListener('change', function(){
        
        tempSettings.bgColor = document.getElementById('prefs-bgColor').value;

        tempSettings.fontColor = document.getElementById('prefs-font-color').value;
        tempSettings.fontSize = parseInt(document.getElementById('prefs-font-size').value);

        document.getElementById('font-size-display').innerText = tempSettings.fontSize;
    
        console.log(tempSettings);
        applySettings(tempSettings);
    });

    document.getElementById('save-btn').addEventListener('click', ()=>{
        // if temp settings in local storage
        // save to local storage or create  and store with a key name of userSettings
        // if(tempSettings != {}){
        //     alert('Settings need to be changed to save user settings');
        // }
        // else{
            if(tempSettings){
                localStorage.setItem("userSettings",JSON.stringify(tempSettings));
                alert('Your preferences have been saved');
            }
            else {
                // console.log('Temp settings not found')
                alert('No preferences have been saved');
            }
        // }
    })

    function applySettings(settings){
        let main = document.querySelector('main');
            
        let sections = document.querySelectorAll('section.main-section');
        for (let index = 0; index < sections.length; index++) {
            sections[index].style.backgroundColor = settings.bgColor;
            sections[index].style.color = settings.fontColor;
            
        }
        main.style.color = settings.fontColor;
        main.style.fontSize = settings.fontSize + 'px';  
    }

    

    
    
    // Event handler to hide the main-nav-links after a click event on any of the links
    // only in screen sizes of max-width 400px

    document.getElementById('main-nav-links').addEventListener('click', function(e){
        if(window.screen.width <= 480){
            e.currentTarget.style.display = 'none';
        }
        // else{e.currentTarget.style.display = 'block';}
    });

    // Event listener for window resise
    window.addEventListener('resize', function(){
        // console.log('Window Width: ' + window.screen.width);
        // console.log('Window Height: ' + window.screen.height);

        if (window.screen.width > 480){
            // remove inline styling attribute that JS might have added to the DOM 
            // for this element menu for the burger menu was clicked in mobile view
            this.document.getElementById('main-nav-links').removeAttribute('style');
        }
    });

    let TDcellsinPrefstable = document.getElementById('prefs-table').getElementsByTagName('td');
    // console.log(TDcellsinPrefstable);

    for (let index = 0; index < TDcellsinPrefstable.length-1; index++) {
        // console.log(TDcellsinPrefstable[index]);
        TDcellsinPrefstable[index].addEventListener('mouseover',() => {
            TDcellsinPrefstable[index].style.fontWeight = 'bold';
        });

        TDcellsinPrefstable[index].addEventListener('mouseout',() => {
            TDcellsinPrefstable[index].style.fontWeight = 'normal';
        });        
   }


};