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

## How to use the calculator

### 1. Enter the dimensions and material of the part you're analyzing

As an example, think of a plank of wood laying flat. The plank is on a pirate ship and you are about to walk it:

- **Outside dimensions**:
    - **Length** is the length you have to walk on the plank
    - **Width** is the width on the plank to fit your foot side to side.
    - **Thickness** is the thickness of your plank and the most important parameter for defining the stiffness of the plank (assuming the material doesn't change).
- **Inside dimensions**: Say the plank is hollow. The dimesnions are the size of the hole in the middle of the plank (or a beam[^(*]). It's assumed the plank is hollow along the entirety of its length.
    - What if your plank is not an **'O' beam** but an **'I' beam**? For bending strength, the theory states that it doesn't matter if the beam is formed from two **'C' beams** facing eachother, or their backs against eachother, as long as the 'C' shape (or 'I' shape) is **upright** and not on it's side. (For a square 'O' beam, it doesn't matter.)
    - If you have a solid plank (or a beam) set inside dimensions to zero (0).
- **Force** is the force at which gravity is pulling you down, when you are standing on the less comfortable end of the plank. Simultaniously, it is the force at which the plank is supporting you

- From the **material drop down** (once implemented) you can choose the material your plank is made of. It has a significant effect on the strength and stiffness of your beam.

After inputting these numbers you can press **Calculate** or **Enter on your keyboard.**

[^*)]: This guide uses *"beam"* and *"plank"* interchangeably for ilustrative purposes.

### 2. Reading the calculator output

The first group of outputs shows you: 
- **Section** the crossection of your beam. This, along with the material, defines the resistance of your beam to shearing forces. Think your pirate plank and the likelyhood that your foot goes through the plank snapping it in two at the spot you stepped on it.
- **Area Moment** is an engineering unit. It describes the resistance of the chosen **profile** (dimensions and shape) against bending the beam. Larger area moment makes for a stiffer beam.
    - Curiously, if you took the pirate plank and turned it on it's side, the area moment would increase significantly, because the plank would be stiffer that way. It would make walking the plank even more difficult though.
- **Young's Modulus** describes the stiffness of the **material** itself. 
- **Yield Strength** describes the strength of the **material** itself.
- **Dencity** is describes the relation of mass to size of the **material**.

#### Case 0: Stretch

This case analyzes  what would happen if instead ow walking on the plank, everything was turned 90 degrees, and you were hanging off the plank with the pirate ship above you!
- **Sigma Max** describes the **strain** the material endures as the plank or beam is **stretched** with the **force** you set in a previous step.
    - If the **strain** goes over the **yeald strength**, the plank snaps and you fall.
    - The **Safety factor** is a **multiplyer** and describes how much more load the plank can take in this direction.
- **y Max** shows the absolute amount the plank has stretched from the weight hanging off it.
- **Frequency** is the nominal frequency at which the plank would resonate in this direction. *(Work in progress!)*

#### Case 1: End bend

This case looks at the case, where you have started to walk the plank. The calculation analyzes the section between you (the load) and the point where the plank is supported by other structure. This distance is the **Length** you input in the start.
- **Sigma Max** describes the **strain** the material endures as the plank or beam is **bent** by a **force** at the end of the beam. 
    - The **force** is the one you set in a previous step.
    - The bending causes the material on the bottom face of the plank to contract and the material on the top edge to stretch. The **maximum strain** is measured at the point where the stretching is worst: half way between the load and the support.
    - **Sigma Max** can be reduced by **shortening** the beam, making it **thicker** or a **lot wider**.
- **Q i.e. Shearing Strain**
    - Shearing strain can be reduced by making the **section** larger, that is, by making the dimensions larger or the hole smaller.
- **y Max** shows the absolute amount the plank has **bent down** from the weight on it.
- **Frequency** is the nominal frequency at which the plank would resonate in this direction. *(Work in progress!)*

#### Case 2: Middle bend

This case looks at the case, where you are standing on the middle of the plank and a another friendly ship has parked along side and is helping keep the other end steady. The plank is therefore supported on both ends and you are standing in the middle. The load is analyzed between the two supports.  This distance is the **Length** you input in the start. The maximum bending strain is below your feet on both top and bottom faces of the plank.
- **Sigma Max** describes the **strain** the material endures as the plank or beam is **bent** by a **force** at the **middle** of the beam, when **both ends are supported**. 
    - The **force** is the one you set in a previous step.
    - The bending causes the material on the bottom face of the plank to contract and the material on the top edge to stretch. The **maximum strain** is measured at the point where the stretching is worst: half way between the two supports.
    - **Sigma Max** can be reduced by **shortening** the beam, making it **thicker** or a **lot wider**.
- **Q i.e. Shearing Strain**
    - Shearing strain can be reduced by making the **section** larger, that is, by making the dimensions larger or the hole smaller.
- **y Max** shows the absolute amount the plank has **bent down** from the weight on it.
- **Frequency** is the nominal frequency at which the plank would resonate in this direction. *(Work in progress!)*

#### Case: Buckling

Here we assume the plank has been planted in sand upright and now the pirates are forcing you to stand on its end.

The forces on each line are **threshold forces**. If the **Force** you set at the beginning is greater than the threshold, it is likely the beam is suceptible to bucking in that mode.

The modes are as follows: (see pictures for more detail)
- Mode I: The beam is solidly attached on one end. (Cast in concrete)
- Mode II: Both ends are effectively hinges. (Attachment with a single screw)
- Mode III: One end is solidly attached and the other is effectively a hinge. (One end has multiple screws, but the other has only one screw.)
- Mode IV: Both ends are solidly attached

---

## See also

#### Standalone Go http/https server backend:
[JValtteri/go-server](https://github.com/JValtteri/go-server/tree/main)
