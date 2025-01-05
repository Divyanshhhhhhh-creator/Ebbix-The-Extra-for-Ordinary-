import { useState } from 'react';
import { Card } from './Card.jsx';
import { AlertCircle, ArrowRight, CheckCircle, Clock, Coins, Copy, CreditCard, History, Shield, Wallet } from 'lucide-react';

const PaymentGateway = () => {
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState('');
    const [fromAddress, setFromAddress] = useState('');
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('metamask');
    const [transactionHash, setTransactionHash] = useState('');
    const [showHistory, setShowHistory] = useState(false);

    const transactionHistory = [
        { id: 1, amount: '100', date: '2024-12-28', status: 'completed', hash: '0x123...' },
        { id: 2, amount: '50', date: '2024-12-27', status: 'completed', hash: '0x456...' },
    ];

    const toAddress = "0x8bcD1557a0A8c4d3E776903f1282859F3E8B8d62";

    const calculateFees = () => {
        if (!amount) return { serviceCharge: 0, networkFee: 0, total: 0 };
        const serviceCharge = (parseFloat(amount) * 0.02);
        const networkFee = 0.001;
        const total = parseFloat(amount) + serviceCharge + networkFee;
        return {
            serviceCharge: serviceCharge.toFixed(4),
            networkFee: networkFee.toFixed(4),
            total: total.toFixed(4)
        };
    };

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });
                setFromAddress(accounts[0]);
                return true;
            } catch (error) {
                console.error('Error connecting wallet:', error);
                return false;
            }
        } else {
            alert('Please install MetaMask!');
            return false;
        }
    };

    const initiatePayment = async () => {
        if (paymentMethod === 'metamask') {
            setIsLoading(true);
            const connected = await connectWallet();
            if (!connected) {
                setIsLoading(false);
                return;
            }

            try {
                const amountInWei = BigInt(Math.round(parseFloat(fees.total) * 1e18)).toString(16);

                const transactionParameters = {
                    to: toAddress,
                    from: fromAddress,
                    value: '0x' + amountInWei,
                    gas: '0x5208',
                };

                const txHash = await window.ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [transactionParameters],
                });

                setTransactionHash(txHash);
                setStep(4);
            } catch (error) {
                console.error('Payment failed:', error);
                alert('Payment failed. Please try again.');
            }
            setIsLoading(false);
        }
    };

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(toAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const paymentMethods = [
        { id: 'metamask', name: 'MetaMask', icon: Wallet },
        { id: 'walletconnect', name: 'WalletConnect', icon: CreditCard },
        { id: 'coinbase', name: 'Coinbase Wallet', icon: Coins },
    ];

    const fees = calculateFees();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-violet-900 p-6 flex items-center justify-center">
            <div className="max-w-4xl w-full space-y-8 relative">
                <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="absolute top-0 right-0 p-2 text-blue-200 hover:text-blue-100
                     transition-colors duration-300 flex items-center gap-2"
                >
                    <History size={20} />
                    <span>History</span>
                </button>

                {showHistory && (
                    <div className="absolute right-0 top-12 w-96 bg-white/10 backdrop-blur-lg rounded-lg
                          p-4 border border-blue-400/20">
                        <h3 className="text-blue-100 font-medium mb-4">Transaction History</h3>
                        <div className="space-y-3">
                            {transactionHistory.map((tx) => (
                                <div key={tx.id}
                                     className="bg-white/5 p-3 rounded-lg hover:bg-white/10
                               transition-colors duration-200">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-blue-200">{tx.amount} EDU</span>
                                        <span className="text-blue-300">{tx.date}</span>
                                    </div>
                                    <div className="flex justify-between text-sm mt-1">
                                        <span className="text-blue-400 text-xs">{tx.hash}</span>
                                        <span className="text-green-400">{tx.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-200">
                        Ebbix Payment Gateway
                    </h1>
                    <p className="text-blue-200">Secure EDU Coin Transactions</p>
                </div>

                <Card className="bg-white/10 backdrop-blur-lg border-blue-400/20 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-semibold text-blue-100">Complete Payment</h2>
                            <p className="text-blue-300 text-sm">Step {step} of 4</p>
                        </div>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4].map((num) => (
                                <div
                                    key={num}
                                    className={`h-2 w-12 rounded-full transition-all duration-300 ${
                                        num <= step ? 'bg-blue-400' : 'bg-blue-800'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        {step === 1 && (
                            <div className="space-y-4">
                                <label className="block text-blue-200 text-sm font-medium">
                                    Amount (EDU)
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-blue-400/30 rounded-lg
                             text-blue-100 placeholder-blue-400/50 focus:outline-none focus:ring-2
                             focus:ring-blue-400/40"
                                        placeholder="Enter amount..."
                                    />
                                    <span className="absolute right-4 top-3 text-blue-400">EDU</span>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <h3 className="text-blue-200 font-medium">Select Payment Method</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {paymentMethods.map(({ id, name, icon: Icon }) => (
                                        <button
                                            key={id}
                                            onClick={() => setPaymentMethod(id)}
                                            className={`p-4 rounded-lg border transition-all duration-300
                               ${paymentMethod === id
                                                ? 'border-blue-400 bg-blue-400/10'
                                                : 'border-blue-400/20 bg-white/5 hover:bg-white/10'}`}
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <Icon className={`h-8 w-8 ${paymentMethod === id ? 'text-blue-400' : 'text-blue-300'}`} />
                                                <span className="text-blue-200">{name}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-4">
                                <div className="bg-white/5 p-4 rounded-lg space-y-3">
                                    <h3 className="text-blue-200 font-medium">Recipient Address</h3>
                                    <div className="flex items-center justify-between bg-white/5 p-2 rounded">
                                        <code className="text-blue-300 text-sm">{toAddress}</code>
                                        <button
                                            onClick={handleCopyAddress}
                                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                        >
                                            {copied ? <CheckCircle className="text-green-400" size={20} /> :
                                                <Copy className="text-blue-400" size={20} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-3 bg-white/5 p-4 rounded-lg">
                            <h3 className="text-blue-200 font-medium">Transaction Summary</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-blue-300">Amount</span>
                                    <span className="text-blue-200">{amount || '0'} EDU</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-blue-300">Ebbix Service Charge (2%)</span>
                                    <span className="text-blue-200">{fees.serviceCharge} EDU</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-blue-300">Network Fee</span>
                                    <span className="text-blue-200">{fees.networkFee} EDU</span>
                                </div>
                                <div className="h-px bg-blue-400/20 my-2" />
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-blue-300">Total Amount</span>
                                    <span className="text-blue-200">{fees.total} EDU</span>
                                </div>
                            </div>
                        </div>

                        {step === 4 && (
                            <div className="text-center space-y-6">
                                <div className="relative">
                                    <CheckCircle className="mx-auto h-20 w-20 text-green-400" />
                                    <div className="absolute -top-2 -right-2">
                                        <div className="h-4 w-4 rounded-full bg-green-400 opacity-75" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-medium text-blue-100">Payment Successfully Completed!</h3>
                                    <p className="text-blue-300">Your EDU coins have been transferred</p>
                                </div>
                                <div className="bg-white/5 p-6 rounded-lg space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-blue-300">Amount</span>
                                            <span className="text-blue-200">{amount} EDU</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-blue-300">Transaction Hash</span>
                                            <span className="text-blue-200 font-mono text-xs">{transactionHash}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-blue-300">Status</span>
                                            <span className="text-green-400">Confirmed</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-blue-300">Time</span>
                                            <span className="text-blue-200">{new Date().toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="w-full py-3 px-4 bg-blue-500 rounded-lg text-white
                             hover:bg-blue-600 transition-colors duration-200"
                                    >
                                        Make Another Payment
                                    </button>
                                </div>
                            </div>
                        )}

                        {step < 4 && (
                            <button
                                onClick={step === 3 ? initiatePayment : () => setStep(prev => prev + 1)}
                                disabled={isLoading ||
                                    (step === 1 && !amount) ||
                                    (step === 2 && !paymentMethod)}
                                className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-500
                         rounded-lg text-white font-medium flex items-center justify-center gap-2
                         hover:from-blue-600 hover:to-indigo-600 transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="h-5 w-5 border-2 border-b-transparent border-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        {step === 3 ? 'Confirm Payment' : 'Continue'}
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PaymentGateway;