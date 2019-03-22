# number-input

> Library for number input

[![NPM](https://img.shields.io/npm/v/number-input.svg)](https://www.npmjs.com/package/number-input) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save number-input-lib
```

## Usage

```jsx
import React, { Component } from 'react'

import NumberInput from 'number-input-lib'

class Example extends Component {
  render () {
    return (
      &lt;NumberInput type="positive-integer"
                   onChange={(value) => console.log(value)}
                   onInvalidValue={(value) => console.log(value)}/&gt

      &lt;NumberInput type="integer"
                   onChange={(value) => console.log(value)
                   onInvalidValue={(value) => console.log(value)}/&gt

      &lt;NumberInput type="positive-float"
                   onChange={(value) => console.log(value)
                   precision={3}
                   onInvalidValue={(value) => console.log(value)}/&gt

      &lt;NumberInput type="float"
                   onChange={(value) => console.log(value)
                   precision={3}
                   onInvalidValue={(value) => console.log(value)}/&gt
    )
  }
}
```

All the properties of **`input`** tag are available to **`NumberInput`** tag. Apart from **`input`** properties some
extra properties are provided based on the provided **`type`** to **`NumberInput`**.

**_`positive-integer`_**

| S.No |     Property          |       type      |          Description                                                                    |
|------|:---------------------:|-----------------|------------------------------------------|
| 1    | **`onInvalidInput`**  | **`function`**  | When invalid value is typed then this<br> method is called and invalid value is<br> provided as parameter |


**_`integer`_**

| S.No |     Property          |       type      |          Description                                                                    |
|------|:---------------------:|-----------------|------------------------------------------|
| 1    | **`onInvalidInput`**  | **`function`**  | When invalid value is typed then this<br> method is called and invalid value is<br> provided as parameter|

**_`positive-float`_**

| S.No |     Property          |       type      |          Description                                                                    |
|------|:---------------------:|-----------------|------------------------------------------|
| 1    | **`onInvalidInput`**  | **`function`**  | When invalid value is typed then this<br> method is called and invalid value is<br> provided as parameter|
| 2    | **`precision`**       | **`number`**    | Specify the maximum number of decimal<br> places allowed |
 
**_`float`_**

| S.No |     Property          |       type      |          Description                                                                    |
|------|:---------------------:|-----------------|------------------------------------------|
| 1    | **`onInvalidInput`**  | **`function`**  | When invalid value is typed then this<br> method is called and invalid value is<br> provided as parameter |
| 2    | **`precision`**       | **`number`**    | Specify the maximum number of decimal<br> places allowed |
 

##Demo
Demo is available [here](https://thenakliman.github.io/number-input) and code for the same is available [here](example/src/App.js)


## License

MIT © [thenakliman](https://github.com/thenakliman)
