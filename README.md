<h1 align="center">Card Flipping Game</h1>

## Description 📜

Given one row of cards, each card is either facing up or facing down. The goal of this game is simple. You need to remove all the cards within 2 rules:

1. You can only remove face up cards.
1. Whenever you remove a card, the neighbor cards (left and right) will flip its face if there is any.

## Example 🤖

Given cards = `['up', 'down', 'uo', 'down', 'up']`
One of the possible way to solve this is

1. Remove the 1st card -> cards = `['removed', 'up', 'up', 'down', 'up']`
2. Remove the last card -> cards = `['removed', 'up', 'up', 'up', 'removed']`
3. Remove the 2nd card -> cards = `['removed', 'removed', 'down', 'up', 'removed']`
4. Remove the 4th card -> cards = `['removed', 'removed', 'up', 'removed', 'removed']`
5. Remove the 3rd card -> cards = `['removed', 'removed', 'removed', 'removed', 'removed']`

It would be easier to understand if you try it yourself by going to the [demo](https://shalluv.github.io/CardFlippingGame/) site.

## Thanks 🤗

This game is inspired by [this](https://www.youtube.com/watch?v=CCxs-tu8tOU&t=495s&pp=ygUOY2FyZCBmbGlwcGluZyA%3D) video.
