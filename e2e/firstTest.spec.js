describe('Example', () => {
 
  it('should have hello text', async()=>{
    await expect(element(by.id('title'))).toBeVisible
  })
});
