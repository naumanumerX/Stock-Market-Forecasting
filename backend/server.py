from flask import Flask, request, jsonify
from flask_cors import CORS
import asyncio

from model import run_ml_algorithm

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

ml_result = ''

@app.route('/abc', methods=['POST'])
def handle_input():
    global ml_result
    if request.method == 'POST':
        data = request.get_json()
        stock_symbol = data.get('stock_symbol', '')
        print(f'Received stock symbol: {stock_symbol}')

        # Call your ML algorithm
        ml_result = asyncio.run(run_ml_algorithm(stock_symbol))

        return jsonify({'stock_symbol': stock_symbol, 'ml_result': ml_result})
    else:
        return jsonify({'message': 'Method Not Allowed'}), 405

@app.route('/abcd', methods=['POST'])
def algorithm_response():
    global ml_result
    if request.method == 'POST':
        data = request.get_json()
        stock_symbol = data.get('stock_symbol', '')

        # Print the stored ml_result
        print("kachay katch de kaadan", ml_result)

        return jsonify({'stock_symbol': stock_symbol, 'ml_result': ml_result})
    else:
        return jsonify({'message': 'Method Not Allowed'}), 405

if __name__ == '__main__':
    app.run(debug=True)
