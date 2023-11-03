<script lang="ts">
    import Collapsable from "./Collapsable.svelte";
    import Chart from "chart.js/auto";
    import { onMount } from "svelte";
    import { run, type NNOut } from "$lib/util/nn/nn";
    import mnist from "mnist";

    export let focusedPixel: number;
    export let image: number[];
    export let output: NNOut;

    const steps = Array.from({ length: 21 }, (_, i) =>
        Number(((1 / 20) * i).toFixed(2))
    );

    function createDataset(focusedPixel: number) {
        return  steps.map((step) => {
            let avg = 0;
            for (let i = 0; i < 100; i++) {
                let stepImage = mnist[output.digit].get(0);
                stepImage[focusedPixel] = step;
                avg += run(stepImage).layers[3][output.digit];
            }
            return avg / 100;
        });
    }

    let canvas: HTMLCanvasElement;

    const data = {
        labels: steps,
        datasets: [
            {
                data: [] as number[],
                fill: false,
                borderColor: "rgb(230, 44, 132)",
                tension: 0.1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "white",
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "white",
                },
            },
        },
    };

    let chart: Chart;

    $: NNResults = createDataset(focusedPixel);
    $: if (chart !== undefined) {
        data.datasets[0].data = NNResults;
        chart.update();
    }

    onMount(() => {
        chart = new Chart(canvas, {
            type: "line",
            data: data,
            options: options,
        });
    });
</script>

<Collapsable heading="Partial Dependence Plot"
    ><div class="w-full max-h-[50vh] flex items-center">
        <canvas bind:this={canvas} />
    </div></Collapsable
>
