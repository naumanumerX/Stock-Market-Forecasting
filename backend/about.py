
import yfinance as yf



print("company infor")
def run_about(stock_symbol):

    ticker = stock_symbol+'.L'
   
    stock_info = yf.Ticker(ticker)
    company_info = stock_info.info
    print("company info", company_info)
    
    
    # Print specific information
    print("Company Name:", company_info['longName'])
    print("Sector:", company_info['sector'])
    print("Industry:", company_info['industry'])
    print("Website:", company_info['website'])
    print("company infor",stock_info)
    # Make the data download asynchronous
   
    return company_info

