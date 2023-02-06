# Box Protocol Smart Contract

## Introduction

This is a smart contract for [Box Protocol](https://boxprotocol.netlify.app/) - a platform for buying and selling tokenized crypto portfolios. It is an easy, self custodial way to invest in boxes representing the hottest ideas and sectors in Web3!.
The contract is currently deployed on [Goerli Testnet](https://goerli.etherscan.io/address/0x77Fdb12CFe181327Bb46d03b41F8F7599D484228#code)

The contract `BoxProtocol.sol` imports contract `PriceFeed.sol` to fetch prices from Chainlink data feeds.

## Variables

- `ISwapRouter` : A public, immutable contract reference to the ISwapRouter contract. Used to call the swapTokens function to swap tokens.
- `WETHinterface` : A contract reference to the WETHinterface contract. Used to call the deposit and withdraw functions on the WETH contract.
- `boxNumber` : An uint256 that stores the number of boxes created.

## Mappings

- `boxDistribution` : A mapping that stores token's box distribution for each box.
- `boxBalance` : A mapping that stores the token balance for each box.
- `tokenAddress` : A mapping that maps the token symbol to its corresponding address.

## Constants

- `poolFee` : A public constant uint24 that represents the pool fee for Uniswap swaps.
- `DECIMAL` : A public constant uint8 that sets the decimal precision of each of the box tokens.

## Structs

- `Token` : A struct that represents a token.
  - name : A string that represents the token symbol.
  - percentage : An uint8 that represents the token's percentage in the box.

<br/>

## External Functions

### buy

    buy(uint boxId) external payable returns(boxTokenMinted boxTokenMinted)

This function allows a user to buy a box by depositing funds. The deposited funds will be used to buy the specified tokens in the specified percentages and an equivalent number of box tokens will be minted to the user's account. If the underlying token is ETH, it will simply be stored in the boxBalance mapping. If the underlying token is WETH, the equivalent ETH will be deposited into the WETHinterface contract. For other tokens, the funds will first be converted to WETH and then swapped using Uniswap's ISwapRouter contract for the required token.

Parameters:
| Name | Type | Description |
|----------|----------|----------|
| boxId | uint256 | ID of the box to be purchased |

Returns:
| Name | Type | Description |
|----------|----------|----------|
| boxTokenMinted | boxTokenMinted | The number of ERC 1155 tokens minted for the specified box. |

<br/>

### sell

    sell(uint boxId, uint256 tokenSellAmount) external

The sell function allows a user to sell a specific amount of tokens belonging to the specified box ID. The function first calculates the sell ratio and then loop over all the tokens in the box to calculate the selling amount. If the token is not ETH, the tokens are swapped to ETH using Uniswap and then the total ETH is trasnfered to the user.

Parameters:
| Name | Type | Description |
|----------|----------|----------|
| boxId | uint256 | The ID of the box to sell tokens from |
| tokenSellAmount | uint256 | The amount of tokens the user wants to sell |

<br/>

### createBox

    createBox(Token[] memory tokens) external returns(uint boxId)

The function takes an array of token distributions as input and creates a new investment box with the specified distribution.

Parameters:
| Name | Type | Description |
|----------|----------|----------|
| tokens | Token[] | An array of Token structs, representing the composition of the investment box. |

Returns:
| Name | Type | Description |
|----------|----------|----------|
| boxId | uint | ID of the box that has been created |

<br/>

## Public Functions

### getNumberOfTokensInBox

    getNumberOfTokensInBox(uint boxId) public view returns(uint)

The function returns the number of underlying tokens in a box.

Parameters:
| Name | Type | Description |
|----------|----------|----------|
| boxId | uint | ID of the box |

Returns:
| Type | Description |
|----------|----------|
| uint | Number of underlying tokens in the box |

<br/>

### getBoxDistribution

    getBoxDistribution(uint boxId, uint tokenNumber) public view returns(Token memory)

The function returns the token name & percentage in a box according to its distribution.

Parameters:
| Name | Type | Description |
|----------|----------|----------|
| boxId| uint | ID of the box |
| tokenNumber| uint | Storage ID of the token in the box |

Returns:
| Type | Description |
|----------|----------|
| Token | A struct with name & percentage of the token |

<br/>

### getBoxTVL

    getBoxTVL(uint boxId) public view returns(uint)

The function returns the Total Value Locked in USD of a particular box.

Parameters:
| Name | Type | Description |
|----------|----------|----------|
| boxId | uint| ID of the box |

Returns:
| Type | Description |
|----------|----------|
| uint | TVL of the box in USD |

<br/>

### getBoxTokenPrice

    getBoxTokenPrice(uint boxId) public view returns(uint)

The function returns the current box token price in USD.

Parameters:
| Name | Type | Description |
|----------|----------|----------|
| boxId | uint| ID of the box |

Returns:
| Type | Description |
|----------|----------|
| uint | Price of the ERC 1155 box token in USD |

<br/>

## Internal Functions

### \_getBoxTokenMintAmount

    _getBoxTokenMintAmount(uint boxId, uint amountInETH) internal view returns(uint)

The function calculated the amount of box token(ERC 1155) to be minted to the user according to the buying amount.

Parameters:
| Name | Type | Description |
|----------|----------|----------|
| boxId | uint| ID of the box |
| amountInETH | uint| Buying amount of the user |

Returns:
| Type | Description |
|----------|----------|
| uint | Amount of box tokens to be minted to the user |

<br/>

### \_swapTokens

    _swapTokens(uint256 amountIn, address tokenIn, address tokenOut) internal returns (uint256 amountOut)

The function uses Uniswap's ISwapRouter to swap between two ERC20 tokens. This function is used by the buy & sell function to swap tokens according to the box distribution.

Parameters:
| Name | Type | Description |
|----------|----------|----------|
| amountIn | uint256| Amount of input tokens to be swapped |
| tokenIn | address| Input token address |
| tokenOut | address| Output token address |

Returns:
| Name | Type | Description |
|----------|----------|----------|
| amountOut| uint256| Amount of output token received after swap |

<br/>
