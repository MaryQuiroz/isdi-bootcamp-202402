var matcha = require('../matcha')
var arroz = require('./arroz')


matcha.describe('Arroz', function () {
    matcha.describe('> constructor', function () {
        matcha.it('should construct', function () {
            var a = new Arroz()

            matcha.expect(a).toBeInstanceOf(Arroz)
            matcha.expect(a.length).toBe(0)
        })

        matcha.it('should construct with multiple values', function () {
            var a = new Arroz(10, 20, 30)

            matcha.expect(a).toBeInstanceOf(Arroz)
            matcha.expect(a.length).toBe(3)
            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(30)
        })

        matcha.it('should construct with one non-numeric value', function () {
            var a = new Arroz(true)

            matcha.expect(a).toBeInstanceOf(Arroz)
            matcha.expect(a.length).toBe(1)
            matcha.expect(a[0]).toBe(true)
        })

        matcha.it('should construct with one numeric value', function () {
            var a = new Arroz(5)

            matcha.expect(a).toBeInstanceOf(Arroz)
            matcha.expect(a.length).toBe(5)
            for (var i = 0; i < a.length; i++)
                matcha.expect(a[i]).toBe(undefined)
        })
    })

    matcha.describe('> push', function () {
        matcha.it('should push a value', function () {
            var a = new Arroz(10, 20, 30)

            matcha.expect(!!a.push).toBe(true)

            var length = a.push(40)

            matcha.expect(a.length).toBe(4)
            matcha.expect(a[a.length - 1]).toBe(40)
            matcha.expect(length).toBe(4)
        })

        matcha.it('should push many values', function () {
            var a = new Arroz(10, 20, 30)

            matcha.expect(!!a.push).toBe(true)

            var length = a.push(40, 50, 60, 70)

            matcha.expect(a.length).toBe(7)
            matcha.expect(a[3]).toBe(40)
            matcha.expect(a[4]).toBe(50)
            matcha.expect(a[5]).toBe(60)
            matcha.expect(a[6]).toBe(70)
            matcha.expect(length).toBe(7)
        })
    })

    matcha.describe('> pop', function () {
        matcha.it('should extract last value', function () {
            var a = new Arroz(10, 20, 30)

            matcha.expect(!!a.pop).toBe(true)

            var value = a.pop()

            matcha.expect(a.length).toBe(2)
            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(undefined)
            matcha.expect(value).toBe(30)
        })
    })

    matcha.describe('> toString', function () {
        matcha.it('should convert to string', function () {
            var a = new Arroz(10, 20, 30, 40, 50)

            matcha.expect(!!a.toString).toBe(true)

            var string = a.toString()

            matcha.expect(string).toBe('Arroz [10, 20, 30, 40, 50]')
        })
    })

    matcha.describe('> forEach', function () {
        matcha.it('should iterate on each element', function () {
            var a = new Arroz(10, 20, 30, 40, 50, 60)
            var b = new Arroz

            a.forEach(function (element, index, arroz) {
                b[index] = { item: element, iterable: arroz }
                b.length++
            })

            matcha.expect(a.length).toBe(6)

            for (var i = 0; i < a.length; i++)
                matcha.expect(a[i]).toBe(10 * (i + 1))

            matcha.expect(b.length).toBe(a.length)

            for (var i = 0; i < b.length; i++) {
                var element = b[i]

                matcha.expect(element.item).toBe((10 * (i + 1)))
                matcha.expect(element.iterable).toBe(a)
            }
        })
    })

    matcha.describe('> find', function () {
        matcha.it('should find a product in cart', function () {
            var cart = new Arroz({ brand: 'adidas', model: 'cool socks', price: 16 }, { brand: 'nike', model: 'air max', price: 120 }, { brand: 'puma', model: 'dangerous glasses', price: 30 })

            var i = 0

            var item = cart.find(function (element, index, arroz) {
                matcha.expect(index).toBe(i++)
                matcha.expect(arroz).toBe(cart)

                return element.price === 120
            })

            matcha.expect(item.brand).toBe('nike')
            matcha.expect(item.model).toBe('air max')
            matcha.expect(item.price).toBe(120)
        })

        matcha.it('should not find a product that is not in cart', function () {
            var cart = new Arroz({ brand: 'adidas', model: 'cool socks', price: 16 }, { brand: 'nike', model: 'air max', price: 120 }, { brand: 'puma', model: 'dangerous glasses', price: 30 })

            var i = 0

            var item = cart.find(function (element, index, arroz) {
                matcha.expect(index).toBe(i++)
                matcha.expect(arroz).toBe(cart)

                return element.price === 500
            })

            matcha.expect(item).toBe(undefined)
        })
    })

    matcha.describe('> map', function () {
        matcha.it('should map numbers to power of 2', function () {
            var nums = new Arroz(10, 20, 30)

            var i = 0

            var numsPow2 = nums.map(function (element, index, arroz) {
                matcha.expect(index).toBe(i++)
                matcha.expect(arroz).toBe(nums)
                matcha.expect(element).toBe(10 * (index + 1))

                return element ** 2
            })

            matcha.expect(nums.length).toBe(3)

            for (var i = 0; i < nums.length; i++) {
                matcha.expect(nums[i]).toBe(10 * (i + 1))
            }

            matcha.expect(numsPow2.length).toBe(nums.length)

            for (var i = 0; i < numsPow2.length; i++) {
                matcha.expect(numsPow2[i]).toBe((10 * (i + 1)) ** 2)
            }
        })
    })

    matcha.describe('> from', function () {
        matcha.it('should create an instance of Arroz from numbers', function () {
            var nums = new Arroz(10, 20, 30)
            var nums2 = Arroz.from(nums)

            matcha.expect(nums.length).toBe(3)

            for (var i = 0; i < nums.length; i++) {
                matcha.expect(nums[i]).toBe(10 * (i + 1))
            }

            matcha.expect(nums === nums2).toBe(false)
            // N2H
            //matcha.expect(nums).not.toBe(nums2) 

            matcha.expect(nums2.length).toBe(nums.length)

            for (var i = 0; i < nums2.length; i++) {
                matcha.expect(nums2[i]).toBe(10 * (i + 1))
            }
        })
    })
})