'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">hermes documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BrandRepositoryModule.html" data-type="entity-link" >BrandRepositoryModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-BrandRepositoryModule-a08958de37886251bdb24e4ad42c81be4250cb12c73162c1dafc12581318d3bce9b4f1a7b0ba68f025447ec7c8315fb59c54aa349e1741d1fe80e23ac0446b8c"' : 'data-target="#xs-injectables-links-module-BrandRepositoryModule-a08958de37886251bdb24e4ad42c81be4250cb12c73162c1dafc12581318d3bce9b4f1a7b0ba68f025447ec7c8315fb59c54aa349e1741d1fe80e23ac0446b8c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BrandRepositoryModule-a08958de37886251bdb24e4ad42c81be4250cb12c73162c1dafc12581318d3bce9b4f1a7b0ba68f025447ec7c8315fb59c54aa349e1741d1fe80e23ac0446b8c"' :
                                        'id="xs-injectables-links-module-BrandRepositoryModule-a08958de37886251bdb24e4ad42c81be4250cb12c73162c1dafc12581318d3bce9b4f1a7b0ba68f025447ec7c8315fb59c54aa349e1741d1fe80e23ac0446b8c"' }>
                                        <li class="link">
                                            <a href="injectables/BrandRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BrandRepository</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BrandsModule.html" data-type="entity-link" >BrandsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-BrandsModule-276cdc73782e1ab2c6d15ee0ad8672df077cc7acf1ca9e233fd92ce3061092fefc3d5f71f1459b31c34eda34f2afe9729413c3dac05dfb356f0fb1ca1097aa5f"' : 'data-target="#xs-controllers-links-module-BrandsModule-276cdc73782e1ab2c6d15ee0ad8672df077cc7acf1ca9e233fd92ce3061092fefc3d5f71f1459b31c34eda34f2afe9729413c3dac05dfb356f0fb1ca1097aa5f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BrandsModule-276cdc73782e1ab2c6d15ee0ad8672df077cc7acf1ca9e233fd92ce3061092fefc3d5f71f1459b31c34eda34f2afe9729413c3dac05dfb356f0fb1ca1097aa5f"' :
                                            'id="xs-controllers-links-module-BrandsModule-276cdc73782e1ab2c6d15ee0ad8672df077cc7acf1ca9e233fd92ce3061092fefc3d5f71f1459b31c34eda34f2afe9729413c3dac05dfb356f0fb1ca1097aa5f"' }>
                                            <li class="link">
                                                <a href="controllers/BrandsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BrandsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-BrandsModule-276cdc73782e1ab2c6d15ee0ad8672df077cc7acf1ca9e233fd92ce3061092fefc3d5f71f1459b31c34eda34f2afe9729413c3dac05dfb356f0fb1ca1097aa5f"' : 'data-target="#xs-injectables-links-module-BrandsModule-276cdc73782e1ab2c6d15ee0ad8672df077cc7acf1ca9e233fd92ce3061092fefc3d5f71f1459b31c34eda34f2afe9729413c3dac05dfb356f0fb1ca1097aa5f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BrandsModule-276cdc73782e1ab2c6d15ee0ad8672df077cc7acf1ca9e233fd92ce3061092fefc3d5f71f1459b31c34eda34f2afe9729413c3dac05dfb356f0fb1ca1097aa5f"' :
                                        'id="xs-injectables-links-module-BrandsModule-276cdc73782e1ab2c6d15ee0ad8672df077cc7acf1ca9e233fd92ce3061092fefc3d5f71f1459b31c34eda34f2afe9729413c3dac05dfb356f0fb1ca1097aa5f"' }>
                                        <li class="link">
                                            <a href="injectables/BrandsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BrandsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductRepositoryModule.html" data-type="entity-link" >ProductRepositoryModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProductRepositoryModule-55f1f2cfa19f73ebe07fb5113de45c6f1fd7dc2c2bccac70161c42a88fda429adca2ccd743c823ce2242d7f5811ea92e74cddbf356b00f0969b1346ea4a2d152"' : 'data-target="#xs-injectables-links-module-ProductRepositoryModule-55f1f2cfa19f73ebe07fb5113de45c6f1fd7dc2c2bccac70161c42a88fda429adca2ccd743c823ce2242d7f5811ea92e74cddbf356b00f0969b1346ea4a2d152"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductRepositoryModule-55f1f2cfa19f73ebe07fb5113de45c6f1fd7dc2c2bccac70161c42a88fda429adca2ccd743c823ce2242d7f5811ea92e74cddbf356b00f0969b1346ea4a2d152"' :
                                        'id="xs-injectables-links-module-ProductRepositoryModule-55f1f2cfa19f73ebe07fb5113de45c6f1fd7dc2c2bccac70161c42a88fda429adca2ccd743c823ce2242d7f5811ea92e74cddbf356b00f0969b1346ea4a2d152"' }>
                                        <li class="link">
                                            <a href="injectables/ProductRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductRepository</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProductsModule-3008a986fa63aa5b72fb62fecbc42088b33ac7534dcdfd414ecf4f8d4f1a140573f840be823ff7385775769f9ebd124a7e1b293e9c4586e7e0d3453bdb2c6a12"' : 'data-target="#xs-controllers-links-module-ProductsModule-3008a986fa63aa5b72fb62fecbc42088b33ac7534dcdfd414ecf4f8d4f1a140573f840be823ff7385775769f9ebd124a7e1b293e9c4586e7e0d3453bdb2c6a12"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-3008a986fa63aa5b72fb62fecbc42088b33ac7534dcdfd414ecf4f8d4f1a140573f840be823ff7385775769f9ebd124a7e1b293e9c4586e7e0d3453bdb2c6a12"' :
                                            'id="xs-controllers-links-module-ProductsModule-3008a986fa63aa5b72fb62fecbc42088b33ac7534dcdfd414ecf4f8d4f1a140573f840be823ff7385775769f9ebd124a7e1b293e9c4586e7e0d3453bdb2c6a12"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProductsModule-3008a986fa63aa5b72fb62fecbc42088b33ac7534dcdfd414ecf4f8d4f1a140573f840be823ff7385775769f9ebd124a7e1b293e9c4586e7e0d3453bdb2c6a12"' : 'data-target="#xs-injectables-links-module-ProductsModule-3008a986fa63aa5b72fb62fecbc42088b33ac7534dcdfd414ecf4f8d4f1a140573f840be823ff7385775769f9ebd124a7e1b293e9c4586e7e0d3453bdb2c6a12"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductsModule-3008a986fa63aa5b72fb62fecbc42088b33ac7534dcdfd414ecf4f8d4f1a140573f840be823ff7385775769f9ebd124a7e1b293e9c4586e7e0d3453bdb2c6a12"' :
                                        'id="xs-injectables-links-module-ProductsModule-3008a986fa63aa5b72fb62fecbc42088b33ac7534dcdfd414ecf4f8d4f1a140573f840be823ff7385775769f9ebd124a7e1b293e9c4586e7e0d3453bdb2c6a12"' }>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SellerRepositoryModule.html" data-type="entity-link" >SellerRepositoryModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SellerRepositoryModule-caab1fa540e0bdc1e8bb6fca0ea8062c974dfeaeee80012ee3144417f0ac9482d13a89a4a027cd3bbcfa88e7b8e8dfc585b9d5dc3b1ca691dc95f5cb7062208a"' : 'data-target="#xs-injectables-links-module-SellerRepositoryModule-caab1fa540e0bdc1e8bb6fca0ea8062c974dfeaeee80012ee3144417f0ac9482d13a89a4a027cd3bbcfa88e7b8e8dfc585b9d5dc3b1ca691dc95f5cb7062208a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SellerRepositoryModule-caab1fa540e0bdc1e8bb6fca0ea8062c974dfeaeee80012ee3144417f0ac9482d13a89a4a027cd3bbcfa88e7b8e8dfc585b9d5dc3b1ca691dc95f5cb7062208a"' :
                                        'id="xs-injectables-links-module-SellerRepositoryModule-caab1fa540e0bdc1e8bb6fca0ea8062c974dfeaeee80012ee3144417f0ac9482d13a89a4a027cd3bbcfa88e7b8e8dfc585b9d5dc3b1ca691dc95f5cb7062208a"' }>
                                        <li class="link">
                                            <a href="injectables/SellerRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SellerRepository</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SellersModule.html" data-type="entity-link" >SellersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SellersModule-25ffcd56fe8a509d0fa1541a983c274fa685d2b897c455a821fb829da38507a29b5469f19d7f1441ffd66b557a6dca3919442690b33bd0c5cbf05143339f2114"' : 'data-target="#xs-controllers-links-module-SellersModule-25ffcd56fe8a509d0fa1541a983c274fa685d2b897c455a821fb829da38507a29b5469f19d7f1441ffd66b557a6dca3919442690b33bd0c5cbf05143339f2114"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SellersModule-25ffcd56fe8a509d0fa1541a983c274fa685d2b897c455a821fb829da38507a29b5469f19d7f1441ffd66b557a6dca3919442690b33bd0c5cbf05143339f2114"' :
                                            'id="xs-controllers-links-module-SellersModule-25ffcd56fe8a509d0fa1541a983c274fa685d2b897c455a821fb829da38507a29b5469f19d7f1441ffd66b557a6dca3919442690b33bd0c5cbf05143339f2114"' }>
                                            <li class="link">
                                                <a href="controllers/SellersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SellersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SellersModule-25ffcd56fe8a509d0fa1541a983c274fa685d2b897c455a821fb829da38507a29b5469f19d7f1441ffd66b557a6dca3919442690b33bd0c5cbf05143339f2114"' : 'data-target="#xs-injectables-links-module-SellersModule-25ffcd56fe8a509d0fa1541a983c274fa685d2b897c455a821fb829da38507a29b5469f19d7f1441ffd66b557a6dca3919442690b33bd0c5cbf05143339f2114"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SellersModule-25ffcd56fe8a509d0fa1541a983c274fa685d2b897c455a821fb829da38507a29b5469f19d7f1441ffd66b557a6dca3919442690b33bd0c5cbf05143339f2114"' :
                                        'id="xs-injectables-links-module-SellersModule-25ffcd56fe8a509d0fa1541a983c274fa685d2b897c455a821fb829da38507a29b5469f19d7f1441ffd66b557a6dca3919442690b33bd0c5cbf05143339f2114"' }>
                                        <li class="link">
                                            <a href="injectables/SellersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SellersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/BrandEntity.html" data-type="entity-link" >BrandEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ProductEntity.html" data-type="entity-link" >ProductEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/SellerEntity.html" data-type="entity-link" >SellerEntity</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BasicEntity.html" data-type="entity-link" >BasicEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/BrandEntity.html" data-type="entity-link" >BrandEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBrandDto.html" data-type="entity-link" >CreateBrandDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBrandSerializer.html" data-type="entity-link" >CreateBrandSerializer</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductSerializer.html" data-type="entity-link" >CreateProductSerializer</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSellerDto.html" data-type="entity-link" >CreateSellerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSellerSerializer.html" data-type="entity-link" >CreateSellerSerializer</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindOptions.html" data-type="entity-link" >FindOptions</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetBrandResponse.html" data-type="entity-link" >GetBrandResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetProductResponse.html" data-type="entity-link" >GetProductResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetSellerResponse.html" data-type="entity-link" >GetSellerResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/migrations1679162777045.html" data-type="entity-link" >migrations1679162777045</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductEntity.html" data-type="entity-link" >ProductEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/Response400Dto.html" data-type="entity-link" >Response400Dto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Response400Dto-1.html" data-type="entity-link" >Response400Dto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Response400Dto-2.html" data-type="entity-link" >Response400Dto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Response404Dto.html" data-type="entity-link" >Response404Dto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Response404Dto-1.html" data-type="entity-link" >Response404Dto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Response404Dto-2.html" data-type="entity-link" >Response404Dto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Response409Dto.html" data-type="entity-link" >Response409Dto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Response409Dto-1.html" data-type="entity-link" >Response409Dto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TestHelper.html" data-type="entity-link" >TestHelper</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBrandDto.html" data-type="entity-link" >UpdateBrandDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBrandSerializer.html" data-type="entity-link" >UpdateBrandSerializer</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link" >UpdateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductSerializer.html" data-type="entity-link" >UpdateProductSerializer</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSellerDto.html" data-type="entity-link" >UpdateSellerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSellerSerializer.html" data-type="entity-link" >UpdateSellerSerializer</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});