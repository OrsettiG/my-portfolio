class TypeWriter{
    constructor(txtElement, words, wait = 2500){
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type(){
        //Current Word Index
        const current = this.wordIndex % this.words.length;
        
        //Current word text
        const fullTxt = this.words[current];

        //Check if text isDeleting
        if(this.isDeleting){
            this.txt = fullTxt.substring(0, this.txt.length -1);
        } else{
            this.txt = fullTxt.substring(0, this.txt.length +1);
        }

        //Add text to span
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        //Set type speeds
        let typeSpeed = 300;

        if(this.isDeleting){
            typeSpeed /= 2;
        }

        //Word Complete
        if(!this.isDeleting && this.txt === fullTxt){
            //Pause for 2.5s
            typeSpeed = this.wait;
            
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === ''){
            this.isDeleting = false;
            this.wordIndex++;
            //Pause for 0.5s
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

//DOM Event Listener
document.addEventListener('DOMContentLoaded', init);

//Init Application
function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    //Init
    new TypeWriter(txtElement, words, wait);
}