describe('Search', function() {

    var list, jonny, martina, angelica, sebastian, imma, hasse;

    before(function() {
        list = fixture.list(['name', 'born'], fixture.all);

        jonny = list.get('name', 'Jonny Strömberg')[0];
        martina = list.get('name', 'Martina Elm')[0];
        angelica = list.get('name', 'Angelica Abraham')[0];
        sebastian = list.get('name', 'Sebastian Höglund')[0];
        imma = list.get('name', 'Imma Grafström')[0];
        hasse = list.get('name', 'Hasse Strömberg')[0];
    });

    after(function() {
        fixture.removeList();
    });

    afterEach(function() {
        list.search();
        list.show(1, 200);
    })

    describe('Case-sensitive', function() {
        it('should not be case-sensitive', function() {
            var result = list.search('jonny');
            expect(result.length).to.equal(1);
            expect(result[0]).to.deep.equal(jonny);
        });
    });

    describe('Number of results', function() {
        it('should find jonny, martina, angelice', function() {
            var result = list.search('1986');
            expect(result.length).to.equal(3); // 3!!
            expect(jonny.matching()).to.be.true;
            expect(martina.matching()).to.be.true;
            expect(angelica.matching()).to.be.true;
            expect(sebastian.matching()).to.be.false;
            expect(imma.matching()).to.be.false;
            expect(hasse.matching()).to.be.false;
            list.search();
        });
        it('should find all with utf-8 char ö', function() {
            var result = list.search('ö');
            expect(result.length).to.equal(4); // 4!!
            expect(jonny.matching()).to.be.true;
            expect(martina.matching()).to.be.false;
            expect(angelica.matching()).to.be.false;
            expect(sebastian.matching()).to.be.true;
            expect(imma.matching()).to.be.true;
            expect(hasse.matching()).to.be.true;
        });
    });

    describe('Specfic columns', function() {
        it('should find match in column', function() {
            var result = list.search('jonny', { name: true });
            expect(result.length).to.equal(1);
            expect(result[0]).to.deep.equal(jonny);
        });
        it('should not find match in column', function() {
            var result = list.search('jonny', { born: true });
            expect(result.length).to.equal(0);
        });
    });

    /*
    describe('Show and pages', function() {
        it('should return the visible items', function() {
            list.show(1,2);
            var result = list.search('1986');
            expect(result).to.deep.equal(list.visibleItems);
        });

        it('should return be 2 visible items and 3 matching', function() {
            list.show(1,2);
            var result = list.search('1986');
            expect(result.length).to.equal(2);
            expect(list.visibleItems.length).to.equal(2);
            expect(list.matchingItems.length).to.equal(3);
        });

        describe('Specific items', function() {
            beforeEach(function() {
                list.show(1,2);
                var result = list.search('1986');
            });
            it('should match jonny', function() {
                expect(jonny.matching()).to.be.true;
                expect(jonny.found).to.be.true;
                expect(jonny.visible()).to.be.true;
            });
            it('should match martina', function() {
                expect(martina.matching()).to.be.true;
                expect(martina.found).to.be.true;
                expect(martina.visible()).to.be.true;
            });
            it('should match but not show angelica', function() {
                expect(angelica.matching()).to.be.true;
                expect(angelica.found).to.be.true;
                expect(angelica.visible()).to.be.false;
            });
            it('should not match sebastian', function() {
                expect(sebastian.matching()).to.be.false;
                expect(sebastian.found).to.be.false;
                expect(sebastian.visible()).to.be.false;
            });
            it('should not match imma', function() {
                expect(imma.matching()).to.be.false;
                expect(imma.found).to.be.false;
                expect(imma.visible()).to.be.false;
            });
            it('should not match hasse', function() {
                expect(hasse.matching()).to.be.false;
                expect(hasse.found).to.be.false;
                expect(hasse.visible()).to.be.false;
            });
        });
    });
    */
});