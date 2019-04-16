const addElement=function(e,t){var a=document.createElement(e);return a.className=t,a};var showAlert=function(e,t){var a=addElement("div","alert"),n=addElement("div","alert__text");n.innerHTML=e;var d=addElement("div","alert__actions"),i=addElement("button","button");i.innerHTML=t||"Close",d.append(i),a.append(n),a.append(d),document.body.append(a),setTimeout(function(){a.classList.add("alert_faded")},10),i.addEventListener("click",()=>{a.classList.remove("alert_faded"),setTimeout(function(){a.remove()},250)})},labeledInputs=document.querySelectorAll(".input__field");labeledInputs.forEach(e=>{e.parentElement.classList.add("input_floating"),e.value&&e.classList.add("input__field_filled"),e.addEventListener("change",function(e){""==this.value?this.classList.remove("input__field_filled"):this.classList.add("input__field_filled")})});var validationForms=document.querySelectorAll("[data-validate]"),validationPatterns={email:/.+@.+\..+/i,phone:/^[0-9-+() ]*$/,text:/^[A-Za-zА-Яа-я0-9_-]*$/},addError=function(e,t){e.parentElement.querySelector(".input__error").innerHTML=t},checkRequired=function(e){return!e.required||""!=e.value||(addError(e,"Необходимо заполнить это поле"),!1)},checkPattern=function(e){if(!e.dataset.validatePattern||""==e.value)return!0;var t=validationPatterns[e.dataset.validatePattern],a=e.value;return t.test(a)||addError(e,"Использованы недопустимые символы"),t.test(a)},checkLength=function(e){if(!e.dataset.validateLength||""==e.value)return!0;var t=e.dataset.validateLength,a=e.value.length;if(t.includes("-")){var n=t.split("-");return a>=n[0]&&a<=n[1]||(a<n[0]?addError(e,"Значение слишком короткое. Минимальное количество символов: "+n[0]):a>n[1]&&addError(e,"Значение слишком длинное. Максимальное количество символов: "+n[1]),!1)}return a>=t||(addError(e,"Значение слишком короткое. Минимальное количество символов: "+t),!1)},checkRange=function(e){if(!e.dataset.validateRange||""==e.value)return!0;var t=e.dataset.validateRange,a=parseInt(e.value);if(t.includes("-")){var n=t.split("-");return a>=n[0]&&a<=n[1]||(a<n[0]?addError(e,"Значение слишком маленькое. Минимальное значение: "+n[0]):a>n[1]&&addError(e,"Значение слишком большое. Максимальное значение: "+n[1]),!1)}return a>=t||(addError(e,"Значение слишком маленькое. Минимальное значение: "+t),!1)},validateInput=function(e,t){var a=checkRequired(e)&&checkPattern(e)&&checkLength(e)&&checkRange(e),n=e.value||!1;return a&&n?(e.classList.add("input__field_status_valid"),e.classList.remove("input__field_status_invalid"),!0):!a&&t?(e.classList.remove("input__field_status_valid"),e.classList.add("input__field_status_invalid"),!1):!!a||(e.classList.remove("input__field_status_valid"),!0)};validationForms.forEach(e=>{var t=e.querySelectorAll(".input__field");t.forEach(e=>{e.addEventListener("keyup",function(){validateInput(e,!1)}),e.addEventListener("click",function(){validateInput(e,!1)}),e.addEventListener("change",function(){validateInput(e,!0)}),e.addEventListener("blur",function(){validateInput(e,!0)})}),e.onsubmit=function(e){var a=!0;return t.forEach(e=>{validateInput(e,!0)||(a=a&&validateInput(e,!0))}),a}});const switches=document.querySelectorAll(".switch");switches.forEach(e=>{e.addEventListener("click",e=>{let t="true"===e.target.getAttribute("aria-checked");e.target.setAttribute("aria-checked",String(!t))})});var modalCloseButton='<button type="button" class="ico-button"><span class="ico"><img src="/img/ico/baseline-close-24px.svg" alt="Иконка закрытия" /></span></button>',closeWindow=function(e,t){e.classList.add("modal-window_closed"),t.classList.add("modal-mask_closed"),setTimeout(function(){e.remove(),t.remove()},500)},createModalWindow=function(e){var t=addElement("div","modal-window"),a=addElement("div","modal-mask"),n=addElement("div","modal-window__close");if(n.innerHTML=modalCloseButton,!e)return showAlert("Content for modal window not found"),!1;t.innerHTML=e,t.append(n),document.body.append(t),document.body.append(a),t.classList.add("modal-window_opened"),a.classList.add("modal-mask_opened"),n.addEventListener("click",function(){closeWindow(t,a)}),a.addEventListener("click",function(){closeWindow(t,a)})},modalButtons=document.querySelectorAll("[data-modal]");modalButtons.forEach(e=>{if("A"===e.tagName)var t=e.getAttribute("href");else t=e.dataset.modal;t=0==t.indexOf("#")?t.substring(1):t;var a=(document.querySelector("#"+t)||!1).innerHTML;e.addEventListener("click",function(){createModalWindow(a)})});