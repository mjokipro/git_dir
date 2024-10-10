describe('testing matchers', function(){
  test('toBe vs toEqual', function(){
    const nums = [3, 4, 5]
    const spread = [...nums]
    const nums2 = nums

    expect(spread).toEqual(nums)
    expect(nums2).toBe(nums)
  })

  test('toContain matcher', function(){
    const colors = ['red', 'green']

    expect(colors).toContain('red')
    expect('hello').toContain('hell')
  })
  test('num matcher', function(){
    expect(7).toBeGreaterThanOrEqual(2)
  })
  test('any matcher', function(){
    const ranNum = Math.random() * 6
    expect(ranNum).toEqual(expect.any(Number))
    expect("addf").toEqual(expect.any(String))
  })

  test('not matcher', function(){
    const numLives = 9
    expect(numLives).not.toEqual(0)
    expect(numLives).not.toEqual(expect.any(Array))
  })
  
})