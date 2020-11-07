import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const Color = props => {
    let ref = useRef();
    useEffect(() => {
        //getting current canvas in react
        let canvas = ref.current;
        var size = 256,
        context = canvas.getContext('2d'),
        data = context.getImageData(0, 0, size, size);
        //creating color with each combination without repeating
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                var p = { x: j, y: i };
                putData(data.data, size, p, xy2d(size, p));
            }
        }
        //creating the final image with the data
        context.putImageData(data, 0, 0);
    });
        
    return (
      <div>
        <h1>{props.title}</h1>
        <canvas
            ref={ref} 
            style={{ width: '500px', height: '500px' }}
         />
      </div>
    );
}

export default Color

function xy2d(n, p) {
    p = { x: p.x, y: p.y };
    var r = { x: 0, y: 0 },
    s,
    d = 0;
    for (s = (n / 2) | 0; s > 0; s = (s / 2) | 0) {
        r.x = (p.x & s) > 0 ? 1 : 0;
        r.y = (p.y & s) > 0 ? 1 : 0;
        d += s * s * ((3 * r.x) ^ r.y);
        rot(s, p, r);
    }
    return d;
}

//convert d to (x,y)
function d2xy(n, d) {
    var r = { x: 0, y: 0 },
      p = { x: 0, y: 0 },
      s,
      rx,
    t = d;
    for (s = 1; s < n; s *= 2) {
        r.x = 1 & (t / 2);
        r.y = 1 & (t ^ rx);
        rot(s, p, r);
        p.x += s * r.x;
        p.y += s * r.y;
        t /= 4;
    }
    return p;
}

//rotate/flip a quadrant appropriately
function rot(n, p, r) {
    if (r.y === 0) {
        if (r.x === 1) {
            p.x = n - 1 - p.x;
            p.y = n - 1 - p.y;
        }

        //Swap x and y
        var t = p.x;
        p.x = p.y;
        p.y = t;
    }
}
function v2rgb(v) {
    return ((v & 0xf800) << 8) | ((v & 0x7e0) << 5) | ((v & 0x1f) << 3);
}
function putData(arr, size, coord, v) {
    var pos = (coord.x + size * coord.y) * 4,
    rgb = v2rgb(v);

    arr[pos] = (rgb & 0xff0000) >> 16;
    arr[pos + 1] = (rgb & 0xff00) >> 8;
    arr[pos + 2] = rgb & 0xff;
    arr[pos + 3] = 0xff;
}

//define size
