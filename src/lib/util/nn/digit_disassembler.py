import numpy as np
import json
from mnist import MNIST


def calc_average_from_dataset():
    mn = MNIST("./mnist")

    mn.gz = True
    images6, labels6 = mn.load_training()
    images1, labels1 = mn.load_testing()

    img = np.concatenate((np.array(images6), np.array(images1)), axis=0)
    lb = np.concatenate((np.array(labels6), np.array(labels1)), axis=0)
    srt = np.zeros(10, dtype=object)

    for i in np.unique(lb):
        srt[i] = img[lb == i]
    img = srt
    del srt

    with open("average_grayscale.json", "w") as f:
        res = []
        for i in range(10):
            res.append(np.average(img[i], axis=0).tolist())
        f.write(json.dumps(res))


def update_negative_weights(weights):
    return np.array(
        [
            (
                1
            )
            * -255
            if weights[i] < 50
            else weights[i]
            for i in range(28 * 28)
        ]
    )


def normalize_weights():
    with open("average_grayscale.json") as f:
        weights = np.array(json.load(f))

    def norm(w):
        w = update_negative_weights(w)
        s = [4 / sum([i for i in w if i > 0]), -4 / sum([i for i in w if i < 0])]
        return list(map(lambda e: e * s[0] if e > 0 else e * s[1], w))

    with open("weights.json", "w") as f:
        f.write(json.dumps(list(map(norm, weights))))


normalize_weights()
