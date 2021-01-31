# webpack

## Webpack이란?

![webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled.png](webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled.png)

fig 1)

프로젝트에서 js파일, img파일, css파일 등 연결되어 있는 모든 것들을 번들링하여 하나의 파일로 만들어주는 것.

## webpack 설치

→ $ npm i -D webpack webpack-cli

```cpp
"devDependencies": {
    "webpack": "^5.19.0",
    "webpack-cli": "^4.4.0"
}
```

### webpack은 최소한의 설정을 필요로 한다.

**→ webpack.config.js 를 작성하자.**

- **mode :  개발용 or 생산용**

    `mode : 'development'`

- **entry :  번들링할 프로젝트의 시작 파일.**

    `entry : {              
       main : './src/app.js'
    }`                        

### entry란?

fig.1)의 project는 .js부터 시작하여 연결된 모든 파일들을 번들링 할 것인데,

이때, .js 가장 시작점이 되는 파일을 entry라고 한다.

- **output : 번들링된 결과물에 대한 설정.**

    path, filename 두 가지로 이루어져있다.

    - path :  node_modules 중 path를 require해서 절대경로로 지정해줌.

        →  `path : path.resolve('./dist')`

    - filename : name 변수에 entry 설정의 key값이 들어옴. (현재 main)
    →  `filename : '[name].js',`

    **즉 ⇒ dist폴더에 main.js 파일로 나온다.**

---

# JavaScript File 설정.

```jsx
const path = require('path');

module.exports = {
    mode : 'development',
    entry : {
        main : './src/app.js'
    },
    output: {
        path : path.resolve('./dist'),
        filename : '[name].js'
    }
}
```

## 예제 코드 작성 후 Test

**< ./src/app.js >**

```jsx
import {sum} from './math.js'
window.addEventListener('DOMContentLoaded', () => {
    sum(1,2);
    const el = document.querySelector('#app');
    el.innerHTML = `
        <h1>${sum(1,2)}</h1>
    `
})
```

**< ./src/math.js >**

```jsx
export function sum(a, b){
    return a + b;
}
```

**< webpack.config.js >**

```jsx
const path = require('path');

module.exports = {
    mode : 'development',
    entry : {
        main : './src/app.js'
    },
    output: {
        path : path.resolve('./dist'),
        filename : '[name].js'
    }
}
```

**→ $ npm run build**

![webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled%201.png](webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled%201.png)

**⇒ ./dist/main.js 가 생성.**

### dist/main.js 를 실행해보자.

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
    <script src='../dist/main.js'></script>
</body>
</html>
```

![webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled%202.png](webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled%202.png)

기본 HTML 파일에서 main.js를 불러와 실행하면 실행된다.

# CSS File 설정

기존 파일에서 `import './app.css';` 를 이용해서 css를 연결할 것이다.

하지만, 연결 후, webpack을 실행해보면 css를 parsing 하지 못해서 Error 가 발생.

![webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled%203.png](webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled%203.png)

→ 이때 필요한 것이 css-loader

→ $ npm i -D css-loader

```jsx
"devDependencies": {
    "css-loader": "^5.0.1",
    "webpack": "^5.19.0",
    "webpack-cli": "^4.4.0"
  }
```

## css-loader

 **css를 위한 webpack 설정.**

< webpack.config.js > 

- module :

    ```jsx
    module : {
    	rules : [
    		{
    			test: /\.css$/,       // css 에 해당하는 정규표현식
    			use : ['css-loader']  // css parsing을 위한 모듈
    		}
    	]
    }
    ```

    ⇒ webpack에 의한 생성파일 (./dist/main.js)에서 작성한 css를 확인할 수 있다.

    ![webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled%204.png](webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled%204.png)

    **하지만, 여기 까지 해서는 JavaScript안에 있는 css코드를 Browser가 인식 할 수 없어서 
    (body tag에 css적용이 안되어 있음.)**

## style-loader

 Browser가 js안의 css를 인식할 수 있도록 하기 위함.

→ $ npm i -D style-loader

< webpack.config.js >

```jsx
module : {
        rules : [
            {
                test : /\.css$/,
                use : ['style-loader','css-loader']
            }
        ]
    }
```

![webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled%205.png](webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled%205.png)

# Image File 설정

img 파일을 위한 설정

js 파일에 `import webpack from './webpack.png';` 로 img 파일을 추가해준다.

HTML에 `<img src="${webpack}" alt="webpackimg"/>` 로 img를 로드 한다.

webpack을 run 한다.

**→ Module parse Error**

![webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled%206.png](webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled%206.png)

## file-loader

**img 파일을 위한 설정.**

→ $ npm i -D file-loader

→ < webpack.config.js >

```jsx
module : {
    rules : [
        {
            test : /\.css$/,
            use : ['style-loader','css-loader']
        },
        {
            test: /\.png$/,
            use : ['file-loader']
        }
    ]
}
```

![webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled%207.png](webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled%207.png)

**if) dist에 있는 png를 못가져온다면? → ../dist를 경로로 지정해 주기 위해  options를 사용한다.**

```jsx
{	
	test: /\.png$/,
	use : [{
	    loader:'file-loader',
	    options: {
	        publicPath : '../dist'
	    }
	}]
}
```

### options의 name 이용.

```jsx
options: {
    name: '[name].[ext]'
}
```

결과물에 대한  이름, 확장자를 지정해줄 수 있다. (이미지 같은 경우에 해시값이 나오는게 아니라, 지정한 이름이 나오도록 할 수 있다.)

![webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled%208.png](webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled%208.png)

![webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled%209.png](webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled%209.png)

## HTML File 설정

## Plugin

**→ $ npm i html-webpack-plugin -D**

1. **플러그인이기 때문에 모듈을 가져온다.**

**`const HtmlWebpackPlugin = require('html-webpack-plugin')`**

**2. < webpack.config.js >에 plugins 설정을 추가한다.**

```jsx
plugins : [
    new HtmlWebpackPlugin({
        template: './src/index.html'
    })
]
```

**3. 기존 index.html의 `<script src="../dist/main.js"></script>` 를 지워도 된다.**
→ plugin이 처리해준다.

**4. 기존 webpack.config.js의 file-loader부분 options를 통해 경로를 지정해 준 것도 지워도 된다.**

![webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled%2010.png](webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled%2010.png)

dist폴더에 index.html도 생성이 된다.

# clean-webpack-plugin

기존에 dist 폴더에 사용하지 않는 다른 것들이 남아있다면 깔끔하게 정리해주는 플러그인.

→ $ npm i -D clean-webpack-plugin

< webpack.config.js >

```jsx
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

plugins : [
    new CleanWebpackPlugin(),
]

```

![webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled%2011.png](webpack%20dd9a3177e55c44f59845ca09f7f20a3b/Untitled%2011.png)

Hash로 만들어져있던 png 파일이 사라지고, 필요한 파일들만 생성된다.