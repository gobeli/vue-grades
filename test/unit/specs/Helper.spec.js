import Vue from 'vue'
import heplper from '@/services/helper'

// describe('Hello.vue', () => {
//   it('should render correct contents', () => {
//     const Constructor = Vue.extend(Hello)
//     const vm = new Constructor().$mount()
//     expect(vm.$el.querySelector('.hello h1').textContent)
//       .to.equal('Welcome to Your Vue.js App')
//   })
// })

describe('helper.js', () => {
  it('should get 1 as the first Id', () => {
    expect(heplper.newId([])).toBe(1);
  });

  it('should get the next Id', () => {
    expect(heplper.newId([1,2,3])).toBe(4);
  })
})
