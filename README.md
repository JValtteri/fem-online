# FEM-online

Web-app for quick strain calculations of beams and struts

**ATTENTION! Not production ready. Missing major features**

## Description

A single page web-app for making simple strain calculations for simple beams and struts. Despite the name, this isn't a true FEM calculator, but a simpler strain calculator. Usually you don't need to make complex calculations to estimate the strength of a part or assembly.

The aim was to make a fast, intuitive and easy to use calculator for the most common cases.

## Requirements

- [**Go**](https://go.dev/) 1.19 or newer

  **- or -** 

- [**Python3**](https://www.python.org/downloads/)

## Running server

##### Go
```
go run .
```
##### Python
```
python -m http.server {PORT_NUMBER}
```

`PORT_NUMBER` should match whether you are using TLS or not; `80` for HTTP and `443` for HTTPS.


---

## See also

#### Standalone Go http/https server backend:
[JValtteri/go-server](https://github.com/JValtteri/go-server/tree/main)
