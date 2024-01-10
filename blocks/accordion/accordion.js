import { createOptimizedPicture } from '../../scripts/aem.js';

function createAccordionButton(col) {
  const button = document.createElement('button');
  button.classList.add('accordion-button');
  button.textContent = col.textContent;
  return button;
}

function createAccordionPanel(col) {
  const divAcc = document.createElement('div');
  divAcc.classList.add('accordion-panel');
  const accordionPara = document.createElement('p');
  accordionPara.textContent = col.textContent;
  divAcc.append(accordionPara);
  return divAcc;
}

export default function decorate(block) {
  const accordionClass = "accordion-button";
  const activeClass = "active";

  const div = document.createElement('div');

  [...block.children].forEach((row) => {
    const button = createAccordionButton(row.children[0]);
    const divAcc = createAccordionPanel(row.children[1]);
    const picture = row.children[2];

    divAcc.append(picture);
    div.append(button);
    div.append(divAcc);
  });

  block.textContent = '';
  block.append(div);

  const acc = document.getElementsByClassName(accordionClass);

  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle(activeClass);
      const panel = this.nextElementSibling;
      panel.style.display = panel.style.display === "block" ? "none" : "block";
    });
  }
}
