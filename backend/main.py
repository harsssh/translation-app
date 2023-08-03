from flask import Flask, request, jsonify
from translator import Translator

app = Flask(__name__)

# Load the trained model
ja2en = Translator(
    model_path='model',
    tokenizer_ja_path='model/kyoto_ja.model',
    tokenizer_en_path='model/kyoto_en.model'
)


@app.route('/translate', methods=['GET'])
def translate():
    # Extract the Japanese text to translate from the request
    text = request.args.get('text')

    # Perform the translation
    translation = ja2en.translate(text)

    # Return the result as JSON
    return jsonify({'translation': translation})


if __name__ == '__main__':
    app.run(debug=True)
