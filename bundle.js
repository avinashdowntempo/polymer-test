(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lit-element')) :
  typeof define === 'function' && define.amd ? define(['exports', 'lit-element'], factory) :
  (global = global || self, factory(global.myBundle = {}, global.litElement));
}(this, function (exports, litElement) { 'use strict';

  /**
   * Use the customElement decorator to define your class as
   * a custom element. Registers <my-element> as an HTML tag.
   */
  // @customElement('my-element')
  class MyElement extends litElement.LitElement {

    /**
     * Create an observed property. Triggers update on change.
     */
    // @property()
    // foo = 'foo';

    /**
     * Implement `render` to define a template for your element.
     */
    render(){
      /**
       * Use JavaScript expressions to include property values in
       * the element template.
       */
      return litElement.html`<p>foo</p>`;
    }
    
  }
  customElements.define('my-element', MyElement);

  exports.MyElement = MyElement;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
