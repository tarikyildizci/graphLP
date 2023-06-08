import React, { useState, useRef } from "react"
import "./Toggle.css"

interface ToggleComponentProps {
  options: React.ReactNode[]
}

const ToggleComponent: React.FC<ToggleComponentProps> = ({
  options,
}) => {
  const [selected, setSelected] = useState(0)
  const optionRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleClick = (index: number) => {
    setSelected(index)
  }

  const getIndicatorStyle = () => {
    const selectedOption = optionRefs.current[selected]
    if (selectedOption) {
      const { width, left } =
        selectedOption.getBoundingClientRect()
      const containerLeft =
        (optionRefs.current[0]?.getBoundingClientRect()
          .left &&
          optionRefs.current[0]?.getBoundingClientRect()
            .left - 4) ||
        0
      return {
        width: width - 8,
        transform: `translateX(${left - containerLeft}px)`,
      }
    }
    return {}
  }

  return (
    <div className="toggle-container">
      <div
        className="selected-indicator"
        style={getIndicatorStyle()}
      />
      {options.map((option, index) => (
        <div
          key={index}
          ref={el => (optionRefs.current[index] = el)}
          className="toggle-option"
          onClick={() => handleClick(index)}
        >
          {option}
        </div>
      ))}
    </div>
  )
}

export default ToggleComponent
