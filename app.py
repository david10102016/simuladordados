from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/lanzar", methods=["POST"])
def lanzar_dado():
    resultado = random.randint(1, 6)
    return jsonify({"resultado": resultado})


if __name__ == "__main__":
    app.run(debug=True)
