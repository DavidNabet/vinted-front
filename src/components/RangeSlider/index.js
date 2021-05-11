import React, { useState } from "react";
import Slider, { SliderTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
const PriceMin = 0;
const PriceMax = 500;
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

const PriceRange = ({ setRangeSlider }) => {
  const [rangeValue, setRangeValue] = useState([10, 500]);

  const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${value} %`}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };

  return (
    <Range
      min={PriceMin}
      max={PriceMax}
      value={rangeValue}
      defaultValue={rangeValue}
      allowCross={false}
      trackStyle={[{ backgroundColor: "#2cb1ba" }]}
      handleStyle={[{ backgroundColor: "#2cb1ba" }]}
      onChange={(values) => setRangeValue(values)}
      onAfterChange={(values) => setRangeSlider(values)}
      tipFormatter={(value) => `${value}€`}
      handle={handle}
    />
  );
};

export default PriceRange;
