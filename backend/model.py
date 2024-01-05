import pandas as pd,numpy as np,matplotlib.pyplot as plt,seaborn as sns
import yfinance as yf
import datetime as dt
from  datetime  import  date,timedelta
import plotly.graph_objects as go 
import plotly.express as px
from statsmodels.tsa.stattools import adfuller
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.tsa.statespace.sarimax import SARIMAX
import asyncio
 
def download_stock_data(ticker, start_date, end_date):
    loop = asyncio.get_event_loop()
    df =  loop.run_in_executor(None, lambda: yf.download(ticker, start=start_date, end=end_date, progress=False))
    return df

async def run_ml_algorithm(stock_symbol):
    today = date.today()
    d1 = today
    end_date = d1 - timedelta(days=4)

    d2 = today - timedelta(days=730)
    start_date = d2.strftime("%Y-%m-%d")

    print("Starting Date is", start_date, "and Ending Date is", end_date)

    ticker = stock_symbol+'.L'
    # stock_info = yf.Ticker(ticker)
    # company_info = stock_info.info
    # print("company info", company_info)
    
    
    # # Print specific information
    # print("Company Name:", company_info['longName'])
    # print("Sector:", company_info['sector'])
    # print("Industry:", company_info['industry'])
    # print("Website:", company_info['website'])
    # print("company infor",stock_info)
    # Make the data download asynchronous
    df =  await download_stock_data(ticker, start_date, end_date)

    df.head()
    df.insert(0,"Date",df.index,True)
    df.reset_index(drop=True,inplace=True)
    df.info()
    df=df[['Date','Close']]
    df.tail()
    #ploting the data to see how it looks
    # fig=px.line(df,x='Date',y='Close',title="Barclays Stock Price")
    # fig.show()#checking if the data is stationary or not
   
    from statsmodels.tsa.stattools import adfuller
    def adf_test(df):
        result=adfuller(df)
        print("ADF Statistics : %f" %result[0])
        print('p-value %f' % result[1])
        if result[1]<=0.05:
            print("Reject the null hypothesis.Data is stationary")
        else :
            print("Fail to reject the null hypothesis .Data is not stationary ")

    adf_test(df['Close'])
    
    from statsmodels.tsa.seasonal import seasonal_decompose
    decompose=seasonal_decompose(df['Close'],model="additive",period=30)
    # decompose.plot()
    from statsmodels.graphics.tsaplots import plot_acf,plot_pacf
    import matplotlib.pyplot as plt
    fig,axes=plt.subplots(3,2,sharex=True)
    axes[0,0].plot(df["Close"]);axes[0,0].set_title("Original Series")
    # plot_acf(df["Close"],ax=axes[0,1])
  
    #1st differencing
    axes[1,0].plot(df["Close"].diff());axes[1,0].set_title("1st Order differencing ")
    plot_acf(df["Close"].diff().dropna(),ax=axes[1,1])

    #2nd differencing
    axes[2,0].plot(df["Close"].diff().diff());axes[2,0].set_title("2nd Order differencing ")
    # plot_acf(df["Close"].diff().diff().dropna(),ax=axes[2,1])
  
    # plt.show()#find p value 

    from statsmodels.graphics.tsaplots import plot_acf,plot_pacf

    # pd.plotting.autocorrelation_plot(df["Close"])

    # plot_acf(df["Close"],alpha=0.05)

    from statsmodels.tsa.stattools import acf,pacf
    x_acf=pd.DataFrame(acf(df["Close"]))
    print(x_acf)
    #finding q

    from statsmodels.graphics.tsaplots import plot_acf,plot_pacf

    # pd.plotting.autocorrelation_plot(df["Close"])

    plot_pacf(df["Close"],alpha=0.05)
    
    from pmdarima.arima import auto_arima
    model=auto_arima(df["Close"],start_p=1,start_q=1,max_p=2,max_q=2,m=12,start_P=0,seasonal=True,d=1,D=1,trace=True,error_action="ignore",suppress_warnings=True)
    # print(model.summary())
    model=auto_arima(df["Close"],seasonal=True,suppress_warnings=True)
    # print(model.summary())
    from statsmodels.tsa.arima.model import ARIMA

    p,d,q=2,1,2
    model=ARIMA(df["Close"],order=(p,d,q))
    model=model.fit()
    # print(model.summary())

    #predict next 2 days
  
    forecast=model.predict(n_periods=5)
    print("forecast",forecast)

    # plt.figure(figsize=[10,5])
    # plt.plot(df["Close"],label="Actual")
    # plt.plot(forecast,label="Forecast")#SARIMA

    import statsmodels.api as sm
    import warnings

    p,d,q=2,1,2

    model=sm.tsa.statespace.SARIMAX(df["Close"],order=(p,d,q),seasonal_order=(p,d,q,12))


    model=model.fit()
    # print(model.summary())
    predictions=model.predict(start=len(df["Close"]),end=len(df["Close"]))


    #predict next 30 days
    print(predictions)
    print("prediction is :",predictions)
    ml_result = f' {predictions.values}'
    # ml_result = f' {company_info}'

    
    # plt.figure(figsize=[10,5])
    # plt.plot(df["Close"],label="Actual")
    # plt.plot(predictions,color="red",label="Predicted")
    # plt.xlabel("Date")

    # plt.ylabel("Close Price")
    # plt.title("BARCLAY Closing Price")

    # plt.legend(loc="upper left")
    # plt.show()
    return ml_result

