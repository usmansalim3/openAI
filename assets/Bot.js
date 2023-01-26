import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function Bot(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" {...props}>
      <Path
        fill="none"
        stroke="#000"
        strokeMiterlimit={10}
        strokeWidth={20}
        d="M577.27 804.78l-41.85.78-166.87 110.62c-.57.41-1.36 0-1.36-.7V804.34h-81.51c-59 0-106.81-47.82-106.81-106.81V394.45c0-58.99 47.81-106.81 106.81-106.81h452.65c58.99 0 106.81 47.82 106.81 106.81v303.08c0 58.99-47.82 106.81-106.81 106.81l-43.64.44H577.27z"
      />
      <Circle
        cx={389.34}
        cy={448.2}
        r={61.34}
        fill="none"
        stroke="#000"
        strokeMiterlimit={10}
        strokeWidth={20}
      />
      <Circle
        cx={635.34}
        cy={448.2}
        r={61.34}
        fill="none"
        stroke="#000"
        strokeMiterlimit={10}
        strokeWidth={20}
      />
      <Path
        fill="none"
        stroke="#000"
        strokeMiterlimit={10}
        strokeWidth={20}
        d="M847.21 634.45V463.13h46.48c19.39 0 35.11 15.72 35.11 35.11v101.11c0 19.39-15.72 35.11-35.11 35.11h-46.48zM95.2 599.35V498.24c0-19.39 15.72-35.11 35.11-35.11h46.48v171.33h-46.48c-19.39-.01-35.11-15.73-35.11-35.11zm546.66 6.99c-8.57 61.51-64.53 109-132.32 109-67.77 0-123.75-47.49-132.32-109h264.64z"
      />
      <Circle
        cx={509.54}
        cy={149.59}
        r={41.94}
        fill="none"
        stroke="#000"
        strokeMiterlimit={10}
        strokeWidth={20}
      />
      <Path
        fill="none"
        stroke="#000"
        strokeMiterlimit={10}
        strokeWidth={20}
        d="M509.54 244.21v-52.68"
      />
    </Svg>
  )
}

export default Bot