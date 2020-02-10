import React from "react";
import classNames from "classnames";
import { mount } from "enzyme";
import DefaultSlider from "../DefaultSlider";
import { html as beautify_html } from "js-beautify";

const TEST_CASES = [
  {
    name: "Prev Arrow",
    property: "prevArrow",
    staticClassName: "slick-prev"
  },
  {
    name: "Next Arrow",
    property: "nextArrow",
    staticClassName: "slick-next"
  }
];

const DEFAULT_CLASSNAME = "defaultClassName";
const PROP_CLASSNAME = "propClassName";

function SampleArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={classNames(className, DEFAULT_CLASSNAME)}
      style={style}
      onClick={onClick}
    />
  );
}

describe("Custom arrows tests", () => {
  TEST_CASES.forEach(({ name: testCaseName, property, staticClassName }) => {
    describe(testCaseName, () => {
      test("should keep provided className", () => {
        const settings = {
          [property]: <SampleArrow className={PROP_CLASSNAME} />
        };

        const slider = mount(<DefaultSlider settings={settings} />);
        const arrow = slider.find(
          `.${[DEFAULT_CLASSNAME, PROP_CLASSNAME, staticClassName].join(".")}`
        );
        expect(arrow.length).toBe(1);
        expect(beautify_html(slider.html())).toMatchSnapshot();
      });
    });
  });
});
