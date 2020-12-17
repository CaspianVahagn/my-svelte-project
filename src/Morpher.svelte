<script>
    import {onMount} from 'svelte';
    import {tweened} from 'svelte/motion';
    import {cubicOut} from 'svelte/easing';
    import {interpolate} from 'polymorph-js';

    let svg, path;
    let pathD;

    let pathVal = [
        '',
        'M-4631.818,5763.092c1010.594-46.567,615.223,132.836,1165.755,72.585s346.946-350.3,490.045-142.2,380.741,248.627,684.375,205.706,239.394-431.061,276.574-447.728',
        'M-4631.818,5763.092c402.215-18.534,1096.851-182.647,523.165-182.079-172.932,106.354,685.63,309.174,415.376,150.852,81.749,8.221,154.3,111.792,227.214,103.812,251.941-113.577,1262.37-252.036,479.3-103.812,136.1-239.571,391.489,210.239,695.123,167.318-105.327-43.1-492.259-90.8-33.724-232.528,82.777,201.6,114.571,138.688,163.447,96.437-938.411,201.361,130.124-304.138,146.851-311.636',
        'M-4631.818,5763.092c402.215-18.534,1096.851-182.647,523.165-182.079-221.709,136.352,311.169,290.935,642.59,254.664,550.532-60.251,346.946-350.3,490.045-142.2s380.741,248.627,684.375,205.706,239.394-431.061,276.574-447.728'
    ];

    const notween = (f,t) => () => t;
    const tween = (f,t) => interpolate([f,t]);

    let line = tweened(0, {
        duration: 900,
        easing: cubicOut,

        interpolate: notween
    });

    function setVal() {
        let where = pathVal.indexOf($line) + 1;
        if (where === pathVal.length) { where = 0 }

        return line.set(pathVal[where], {
            interpolate: tween,
        });
    }

    $: {
        if ($line !== 0) {
            path.setAttribute('d', $line);
        }
    }

    onMount(()=> {
        let frame;
        const loop = () => {
            setVal().then(()=> {
                frame = requestAnimationFrame(loop);
            });
        };

        pathD = path.attributes.d.nodeValue;
        pathVal[0] = pathD;
        line.set(pathD);

        loop();

        return () => cancelAnimationFrame(frame);
    })

</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Rubik&display=swap');

    :global(body) {
        background-color: lightslategrey;
        color: aquamarine;
    }

    div {
        user-select: none;
    }
    h1 {
        font-family: 'Rubik';
        letter-spacing: .05em;
        font-weight: normal;
        text-align: center;
        font-size: 1.2rem;
    }
    svg {
        max-width: 100%;
    }
    path {
        stroke-width: 6px;
        stroke: lightcyan;
    }
</style>

<div on:click={setVal}>
    <h1>Click anywhere to morph</h1>
    <svg bind:this={svg} xmlns="http://www.w3.org/2000/svg" height="495.951" viewBox="0 0 2617.273 495.951">
        <filter id="softGlow" height="300%" width="300%" x="-75%" y="-75%">
            <feMorphology operator="dilate" radius="8" in="SourceAlpha" result="thicken" />
            <feGaussianBlur in="thicken" stdDeviation="20" result="blurred" />
            <feFlood flood-color="aqua" result="glowColor" />
            <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow_colored" />
            <feMerge>
                <feMergeNode in="softGlow_colored"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
        <path bind:this={path} id="Path_172" d="M-4631.818,5763.092c411.967-341.607,1065.27-358.393,1165.755,72.585s880.185-548.627,1023.283-340.53-152.5,446.958,151.136,404.037,239.394-431.061,276.574-447.728" filter="url(#softGlow)" transform="translate(4632.137 -5451)" fill-opacity="0" stroke="#707070"/>
    </svg>
</div>
