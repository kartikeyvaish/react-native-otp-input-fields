# OTP Input

## Basic Usage

```javascript
const [OTP, SetOTP] = useState("");
// Maintain a state variable

// Use it like this
<OTPInput
  onChangeText={SetOTP}
  value={OTP}
  ...

  />
```

![OTP Input Demo GIF](https://i.imgur.com/ZKOv0Pa.gif)

## Parameters

| Parameter           | required | Default | Description                                                               |
| ------------------- | -------- | ------- | ------------------------------------------------------------------------- |
| value               | YES      |         | Maintain a state in parent component and use it as a controlled input     |
| onChangeText        | YES      |         | the onChangeText function to update the state in parent component         |
| length              | NO       | 6       | Number of digits in the OTP                                               |
| autoFocus           | NO       | false   | Whether to autofocus the first field                                      |
| headerTitle         | NO       |         | The header Title above the OTP fields                                     |
| headerTitleStyle    | NO       | {}      | header title styles                                                       |
| headerTitleColor    | NO       | black   | header title color                                                        |
| activeBorderColor   | NO       | #03DAC6 | Color of the border bottom line if the input field is focused             |
| disabledBorderColor | NO       | grey    | Color of the blurred input fields. i.e, the fields which are out of focus |
| activeBorderWidth   | NO       | 3       | Border Width of focused field                                             |
| disabledBorderWidth | NO       | 1       | Border Width of fields which are out pof focus                            |
| children            | NO       | null    | children for the component if any                                         |
| HeaderComponent     | NO       | null    | component to show above the OTP component                                 |
| FooterComponent     | NO       | null    | component to show below the OTP component                                 |
| containerStyle      | NO       | {}      | styles for the container that holds the whole component                   |
| OTPContainerStyle   | NO       | {}      | styles for the OTP container                                              |
| TextInputStyle      | NO       | {}      | styles for the Input fields                                               |
