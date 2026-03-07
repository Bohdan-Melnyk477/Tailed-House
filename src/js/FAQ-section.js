import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

const faqAcc = new Accordion('.faq__accordion', {
  duration: 300,
  showMultiple: false,
  collapse: true,
});
