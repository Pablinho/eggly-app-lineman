describe "filter",->
    beforeEach ->module("Eggly")
    describe "reverse",->
        it "should reverse a string", inject (reverseFilter)->
            expect(reverseFilter "ABCD").toEqual("DCBA")