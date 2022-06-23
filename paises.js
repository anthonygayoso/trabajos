
class myElement extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        
    }

    getTemplate(data) {
        const template = document.createElement("template");

        const returnArray = () => {
            let array = [];
            for (let index = 0; index < 12; index++) {
                array.push(`
                    <div class="box-country">
                        <img src="${data[index].coatOfArms.png}" alt="image.png">
                        <div><span class="subtitle">Pais:</span><span onClick="sendMessage('${data[index].region}')" class="country"> 
                        ${data[index].name.common}</span></div>
                        <div><span class="subtitle">Capital:</span><span> ${data[index].capital[0]}</span></div>
                        <div><span class="subtitle">Población:</span><span> ${data[index].population}</span></div>
                    </div> 
                `);
            }
            return array
        }

        const container = `<div class="container_countries">
                                ${returnArray().join('')}
                            </div>
                                ${this.getStyles()}
                            `
        template.innerHTML = container;
        return template;
    }


    getStyles() {
        return `
          <style>

            .container_countries{
                padding: 30px 80px;
                display : grid;
                grid-template-columns: auto auto auto;
                grid-template-rows: auto;
                column-gap: 30px;
                row-gap: 30px;
            }

            .box-country{
                
                display:flex;
                flex-direction:column;
                align-items:center;
                transition: 0.5s;
                padding : 15px;
                text-align : center;
                background-color : #FAFAFA;
                border-radius : 15px;
                box-shadow: 2px 1px 5px rgb(227, 227, 227) ;
            }

            .box-country:hover{
                transition: 0.5s;
                box-shadow: 10px 5px 15px rgb(227, 227, 227) ;
            }

            .subtitle{
                font-weight:bold;
            }

            .country{
                color : rgb(0, 187, 255);
                cursor : pointer;
            }

            img{
                width:300px;
                height : 300px;
                margin-bottom: 30px;
            }

            @media only screen and (max-width: 820px) {
                .container_countries{
                    padding: 20px;
                    grid-template-columns: auto;
                }
            }    

          </style>
        `;
    }

    async getCountries() {
        const response = await fetch('https://restcountries.com/v3.1/lang/spa');
        var data = await response.json();
        this.render(data);
    }

    connectedCallback() {
        this.getCountries();
    }

    render(data) {
        this.shadowRoot.appendChild(this.getTemplate(data).content.cloneNode(true));
    }

}

customElements.define("my-element", myElement);
