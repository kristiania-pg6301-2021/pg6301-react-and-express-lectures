const React = require('react');
const { mount } = require('enzyme');
const {Match} = require("../src/match");


function checkQuizIsDisplayed(driver){

    const questions = driver.find('.question');
    expect(questions.length).toEqual(1);

    const answers = driver.find('.alternative');
    expect(answers.length).toEqual(4);
}

test("Test rendered quiz", ()=> {

    const driver = mount(<Match/>);
    checkQuizIsDisplayed(driver);
});


test("Test do answer", () => {

    const driver = mount(<Match/>);

    let msg = undefined;

    global.alert = (s) => {msg = s};

    const first = driver.find('.alternative').at(0);
    first.simulate('click');

    checkQuizIsDisplayed(driver);
    expect(msg).toBeDefined();
});
