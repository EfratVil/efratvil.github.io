source: http://bl.ocks.org/mbostock/1021841
Click to perturb or drag the nodes!

This example demonstrates the flexibility of [D3](http://d3js.org/)’s force layout. By using [position Verlet](http://en.wikipedia.org/wiki/Verlet_integration) integration, it is easy to add custom forces to a layout. In this example, the nodes are clustered around four foci using additional forces: the odd nodes are pushed down, the even nodes are pushed up, and a similar bisecting force is applied laterally. These custom forces are based purely on the index of the node, but they could just as easily be derived from properties of data!
