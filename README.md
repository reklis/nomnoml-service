# A self hosted nomnoml rendering service

Local development:

    npm start

Local development containerized:

    npm run docker

Published docker image:

    docker pull reklis/nomnoml-service

Hosted service:

https://nomnoml-service.onrender.com/


## Basic Usage:

Directly passing nomnoml source:
  
    <img src="/nn.svg?src=[about]->[this]">

Indirectly passing public github gist id:

    <img src="/nn.svg?gist=2c01551bc58cdca34c46cca43664d8f1">

Indirectly passing a public gitlab snippet number:

    <img src="/nn.svg?snippet=2494791">

From Readme.md

    ![Thanks](https://nomnoml-service.onrender.com/nn.svg?src=[thank]->[you])


![Thanks](https://nomnoml-service.onrender.com/nn.svg?src=[thank]->[you])
