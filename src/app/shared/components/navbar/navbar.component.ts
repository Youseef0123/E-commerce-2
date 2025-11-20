import { CartService } from './../../../features/cart/services/cart.service';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './../../../core/services/flowbite.service';
import { Component, computed, inject, Input, OnInit, PLATFORM_ID, Signal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly id = inject(PLATFORM_ID);

  
  isLogged = this.authService.isLogged;

  numOfCartItems:Signal<number> = computed(() => this.cartService.cartNumber());
  
  constructor(private FlowbiteService: FlowbiteService) {}
  @Input({ required: true }) isLogin!: boolean;

  ngOnInit(): void {

    this.FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  signOut(): void {
    this.authService.logout();
  }
}
